import { getDb } from "@/db";
import { analyticsEvents } from "@/db/schema";

export async function GET(request: Request) {
  try {
    await getDb().insert(analyticsEvents).values({ eventType: "download", path: new URL(request.url).pathname, reportId: "member-report-002" });
  } catch {}
  return Response.redirect(new URL("/downloads/AI科技胖會員研究報告_002_2026-07-12.pdf", request.url), 302);
}
