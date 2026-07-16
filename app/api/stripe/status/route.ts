import { requireUser } from "@/lib/server-auth";
import { isAdminEmail } from "@/lib/admin-auth";
import { findOrCreateCustomer, getSubscription, isEntitled } from "@/lib/stripe";

export async function GET(request: Request) {
  try {
    const user = await requireUser(request);
    if (isAdminEmail(user.email)) {
      return Response.json({
        configured: Boolean(process.env.STRIPE_SECRET_KEY),
        active: true,
        status: "admin_preview",
        currentPeriodEnd: null,
        accessSource: "admin",
      });
    }
    if (!process.env.STRIPE_SECRET_KEY) return Response.json({ configured: false, active: false });
    const customer = await findOrCreateCustomer(user);
    const subscription = await getSubscription(customer.id);
    return Response.json({
      configured: true,
      active: isEntitled(subscription?.status),
      status: subscription?.status ?? "none",
      currentPeriodEnd: subscription?.current_period_end ?? null,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "無法確認訂閱狀態。" }, { status: 500 });
  }
}
