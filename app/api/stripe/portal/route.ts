import { requireUser } from "@/lib/server-auth";
import { findOrCreateCustomer, stripeRequest } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const customer = await findOrCreateCustomer(user);
    const origin = new URL(request.url).origin;
    const params = new URLSearchParams({ customer: customer.id, return_url: `${origin}/reports` });
    const session = await stripeRequest<{ url: string }>("/billing_portal/sessions", { method: "POST", params });
    return Response.json({ url: session.url });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "目前無法開啟訂閱管理頁面。" }, { status: 500 });
  }
}
