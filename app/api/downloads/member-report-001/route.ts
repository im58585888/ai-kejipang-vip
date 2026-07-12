import { getDb } from "@/db";
import { analyticsEvents } from "@/db/schema";

export async function GET(request: Request) {
  try {
    await getDb().insert(analyticsEvents).values({ eventType: "download", path: new URL(request.url).pathname, reportId: "member-report-001" });
  } catch {}
  return Response.redirect(new URL("/downloads/AI科技胖會員研究報告_001_2026-07-05.pdf", request.url), 302);
}
