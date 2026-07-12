import { getDb } from "@/db";
import { analyticsEvents } from "@/db/schema";

const allowedEvents = new Set(["page_view", "download"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { eventType?: string; path?: string; reportId?: string; visitorId?: string };
    if (!body.eventType || !allowedEvents.has(body.eventType) || !body.path?.startsWith("/")) return new Response(null, { status: 400 });
    await getDb().insert(analyticsEvents).values({
      eventType: body.eventType,
      path: body.path.slice(0, 300),
      reportId: body.reportId?.slice(0, 100) || null,
      visitorId: body.visitorId?.slice(0, 100) || null,
    });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
