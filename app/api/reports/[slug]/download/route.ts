import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { memberReports } from "@/db/schema";
import { analyticsEvents } from "@/db/schema";
import { requireMemberAccess } from "@/lib/member-auth";
import { getReportBucket } from "@/lib/report-storage";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { user } = await requireMemberAccess(request);
    const { slug } = await context.params;
    const reports = await getDb().select().from(memberReports).where(eq(memberReports.slug, slug)).limit(1);
    const report = reports[0];
    if (!report?.pdfKey) return Response.json({ error: "这份报告没有 PDF。" }, { status: 404 });

    const object = await getReportBucket().get(report.pdfKey);
    if (!object) return Response.json({ error: "找不到 PDF 档案。" }, { status: 404 });
    try {
      await getDb().insert(analyticsEvents).values({
        eventType: "download",
        path: new URL(request.url).pathname,
        reportId: report.id,
        userId: user.id,
      });
    } catch {}

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("content-type", "application/pdf");
    headers.set("content-disposition", `attachment; filename="${report.slug}.pdf"`);
    return new Response(object.body, { headers });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "无法下载 PDF。" }, { status: 500 });
  }
}
