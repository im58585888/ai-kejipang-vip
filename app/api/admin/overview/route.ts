import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { analyticsEvents } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminSubscriptions } from "@/lib/stripe";

function monthlyAmount(subscription: Awaited<ReturnType<typeof getAdminSubscriptions>>["data"][number]) {
  return (subscription.items?.data ?? []).reduce((sum, item) => {
    const amount = item.price?.unit_amount ?? 0;
    const recurring = item.price?.recurring;
    if (!recurring?.interval) return sum;
    const count = recurring.interval_count || 1;
    if (recurring.interval === "year") return sum + amount / (12 * count);
    if (recurring.interval === "week") return sum + amount * (52 / 12) / count;
    if (recurring.interval === "day") return sum + amount * (365 / 12) / count;
    return sum + amount / count;
  }, 0);
}

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const [stripe, totals, daily, popular] = await Promise.all([
      getAdminSubscriptions(),
      getDb().select({
        views: sql<number>`sum(case when ${analyticsEvents.eventType} = 'page_view' then 1 else 0 end)`,
        downloads: sql<number>`sum(case when ${analyticsEvents.eventType} = 'download' then 1 else 0 end)`,
        visitors: sql<number>`count(distinct case when ${analyticsEvents.eventType} = 'page_view' then ${analyticsEvents.visitorId} end)`,
      }).from(analyticsEvents),
      getDb().select({ day: sql<string>`date(${analyticsEvents.createdAt})`, views: sql<number>`count(*)` }).from(analyticsEvents)
        .where(sql`${analyticsEvents.eventType} = 'page_view' and ${analyticsEvents.createdAt} >= datetime('now', '-13 days')`)
        .groupBy(sql`date(${analyticsEvents.createdAt})`).orderBy(sql`date(${analyticsEvents.createdAt})`),
      getDb().select({ path: analyticsEvents.path, views: sql<number>`count(*)` }).from(analyticsEvents)
        .where(sql`${analyticsEvents.eventType} = 'page_view'`).groupBy(analyticsEvents.path).orderBy(sql`count(*) desc`).limit(5),
    ]);

    const now = Date.now() / 1000;
    const active = stripe.data.filter((item) => item.status === "active" || item.status === "trialing");
    const canceled30d = stripe.data.filter((item) => item.canceled_at && item.canceled_at >= now - 30 * 86400).length;
    const members = stripe.data.map((item) => {
      const customer = typeof item.customer === "string" ? { id: item.customer } : item.customer;
      const periodEnd = item.current_period_end ?? item.items?.data[0]?.current_period_end ?? null;
      return { id: item.id, email: customer.email || "未提供 Email", name: customer.name || "Stripe 會員", status: item.status, cancelAtPeriodEnd: !!item.cancel_at_period_end, periodEnd };
    }).sort((a, b) => (b.periodEnd || 0) - (a.periodEnd || 0));

    return Response.json({
      metrics: {
        activeMembers: active.length,
        mrr: active.reduce((sum, item) => sum + monthlyAmount(item), 0) / 100,
        downloads: Number(totals[0]?.downloads || 0),
        visitors: Number(totals[0]?.visitors || 0),
        views: Number(totals[0]?.views || 0),
        canceled30d,
      },
      daily: daily.map((row) => ({ day: row.day, views: Number(row.views) })),
      popular: popular.map((row) => ({ path: row.path, views: Number(row.views) })),
      members,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "無法載入營運資料" }, { status: 500 });
  }
}
