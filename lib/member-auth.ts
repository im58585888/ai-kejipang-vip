import { isAdminEmail } from "@/lib/admin-auth";
import { requireUser } from "@/lib/server-auth";
import { findOrCreateCustomer, getSubscription, isEntitled } from "@/lib/stripe";

export async function requireMemberAccess(request: Request) {
  const user = await requireUser(request);
  if (isAdminEmail(user.email)) return { user, accessSource: "admin" as const };
  if (!process.env.STRIPE_SECRET_KEY) throw new Response("Subscription required", { status: 403 });

  const customer = await findOrCreateCustomer(user);
  const subscription = await getSubscription(customer.id);
  if (!isEntitled(subscription?.status)) throw new Response("Subscription required", { status: 403 });
  return { user, accessSource: "subscription" as const };
}

export async function requireReportPublisher(request: Request) {
  const authorization = request.headers.get("authorization");
  const uploadToken = process.env.CODEX_UPLOAD_TOKEN;
  if (uploadToken && authorization === `Bearer ${uploadToken}`) {
    return { createdBy: "codex-automation", accessSource: "automation" as const };
  }

  const user = await import("@/lib/admin-auth").then(({ requireAdmin }) => requireAdmin(request));
  return { createdBy: user.email, accessSource: "admin" as const };
}
