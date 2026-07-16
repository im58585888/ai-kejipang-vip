import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { memberReports } from "@/db/schema";
import { requireMemberAccess, requireReportPublisher } from "@/lib/member-auth";
import { getReportBucket } from "@/lib/report-storage";

const MAX_PDF_BYTES = 20 * 1024 * 1024;
const MAX_MARKDOWN_BYTES = 2 * 1024 * 1024;

function cleanSlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
}

function parseTags(value: string) {
  return value.split(",").map((tag) => tag.trim().toUpperCase()).filter(Boolean).slice(0, 12);
}

function publicReport(report: typeof memberReports.$inferSelect) {
  return {
    id: report.id,
    slug: report.slug,
    reportNo: report.reportNo,
    type: report.type,
    title: report.title,
    description: report.description,
    date: report.publishedAt,
    readMinutes: report.readMinutes,
    tags: JSON.parse(report.tags) as string[],
    featured: report.featured,
    hasPdf: Boolean(report.pdfKey),
    href: `/reports/${report.slug}`,
  };
}

export async function GET(request: Request) {
  try {
    await requireMemberAccess(request);
    const reports = await getDb().select().from(memberReports)
      .where(eq(memberReports.status, "published"))
      .orderBy(desc(memberReports.publishedAt));
    return Response.json({ reports: reports.map(publicReport) });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "無法載入報告。" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const publisher = await requireReportPublisher(request);
    const contentType = request.headers.get("content-type") || "";
    let payload: Record<string, string> = {};
    let pdf: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      for (const key of ["slug", "reportNo", "type", "title", "description", "publishedAt", "readMinutes", "tags", "markdown", "featured"]) {
        const value = form.get(key);
        if (typeof value === "string") payload[key] = value;
      }
      const markdownFile = form.get("markdownFile");
      if (!payload.markdown && markdownFile instanceof File && markdownFile.size) {
        if (markdownFile.size > MAX_MARKDOWN_BYTES) return Response.json({ error: "Markdown 檔案不可超過 2MB。" }, { status: 413 });
        payload.markdown = await markdownFile.text();
      }
      const pdfFile = form.get("pdf");
      if (pdfFile instanceof File && pdfFile.size) pdf = pdfFile;
    } else {
      payload = await request.json() as Record<string, string>;
    }

    const slug = cleanSlug(payload.slug || payload.title || "");
    if (!slug || !payload.title?.trim() || !payload.markdown?.trim()) {
      return Response.json({ error: "标题、slug 与 Markdown 内容为必填。" }, { status: 400 });
    }
    if (new TextEncoder().encode(payload.markdown).byteLength > MAX_MARKDOWN_BYTES) {
      return Response.json({ error: "Markdown 内容不可超过 2MB。" }, { status: 413 });
    }
    if (pdf && pdf.size > MAX_PDF_BYTES) return Response.json({ error: "PDF 不可超过 20MB。" }, { status: 413 });
    if (pdf && pdf.type && pdf.type !== "application/pdf") return Response.json({ error: "附件必须是 PDF。" }, { status: 400 });

    const id = crypto.randomUUID();
    const existing = await getDb().select({ id: memberReports.id, pdfKey: memberReports.pdfKey }).from(memberReports)
      .where(eq(memberReports.slug, slug)).limit(1);
    const pdfKey = pdf ? `member-reports/${slug}/${Date.now()}.pdf` : existing[0]?.pdfKey ?? null;
    if (pdf) await getReportBucket().put(pdfKey!, pdf.stream(), { httpMetadata: { contentType: "application/pdf" } });

    const values = {
      id: existing[0]?.id ?? id,
      slug,
      reportNo: payload.reportNo?.trim() || slug.replace(/\D/g, "").padStart(3, "0").slice(-3) || "000",
      type: payload.type?.trim() || "會員研究報告",
      title: payload.title.trim(),
      description: payload.description?.trim() || "",
      publishedAt: payload.publishedAt || new Date().toISOString().slice(0, 10),
      readMinutes: Math.max(1, Math.min(180, Number(payload.readMinutes) || 10)),
      tags: JSON.stringify(parseTags(payload.tags || "")),
      markdown: payload.markdown,
      pdfKey,
      featured: payload.featured === "true" || payload.featured === "on",
      status: "published",
      createdBy: publisher.createdBy,
      updatedAt: new Date().toISOString(),
    };

    await getDb().insert(memberReports).values(values).onConflictDoUpdate({
      target: memberReports.slug,
      set: values,
    });

    const saved = await getDb().select().from(memberReports).where(eq(memberReports.slug, slug)).limit(1);
    return Response.json({ report: publicReport(saved[0]), uploadedBy: publisher.accessSource }, { status: existing.length ? 200 : 201 });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Report upload failed", error);
    return Response.json({ error: "报告上传失败，请稍后再试。" }, { status: 500 });
  }
}
