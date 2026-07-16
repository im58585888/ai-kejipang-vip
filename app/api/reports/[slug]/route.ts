import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { memberReports } from "@/db/schema";
import { requireMemberAccess } from "@/lib/member-auth";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    await requireMemberAccess(request);
    const { slug } = await context.params;
    const reports = await getDb().select().from(memberReports)
      .where(eq(memberReports.slug, slug)).limit(1);
    const report = reports[0];
    if (!report || report.status !== "published") return Response.json({ error: "找不到这份报告。" }, { status: 404 });

    return Response.json({
      report: {
        slug: report.slug,
        reportNo: report.reportNo,
        type: report.type,
        title: report.title,
        description: report.description,
        publishedAt: report.publishedAt,
        readMinutes: report.readMinutes,
        tags: JSON.parse(report.tags) as string[],
        markdown: report.markdown,
        hasPdf: Boolean(report.pdfKey),
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "无法载入报告。" }, { status: 500 });
  }
}
