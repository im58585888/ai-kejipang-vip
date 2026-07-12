import { requireUser } from "@/lib/server-auth";
import { findOrCreateCustomer, stripeRequest } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const customer = await findOrCreateCustomer(user);
    const price = process.env.STRIPE_PRICE_ID;
    if (!price) return Response.json({ error: "Stripe 尚未完成設定。" }, { status: 503 });
    const origin = new URL(request.url).origin;
    const params = new URLSearchParams({
      mode: "subscription",
      customer: customer.id,
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/subscribe?checkout=success`,
      cancel_url: `${origin}/subscribe?checkout=cancelled`,
      client_reference_id: user.id,
      "subscription_data[metadata][supabase_user_id]": user.id,
      allow_promotion_codes: "true",
    });
    const session = await stripeRequest<{ url: string }>("/checkout/sessions", { method: "POST", params });
    return Response.json({ url: session.url });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "目前無法開啟付款頁面，請稍後再試。" }, { status: 500 });
  }
}
