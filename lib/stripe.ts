const STRIPE_API = "https://api.stripe.com/v1";

type StripeList<T> = { data: T[] };
type StripeCustomer = { id: string; email: string | null };
type StripeSubscription = { id: string; status: string; current_period_end?: number };
export type StripeAdminSubscription = StripeSubscription & {
  customer: string | { id: string; email?: string | null; name?: string | null };
  canceled_at?: number | null;
  cancel_at_period_end?: boolean;
  items?: { data: Array<{ current_period_end?: number; price?: { unit_amount?: number | null; recurring?: { interval?: string; interval_count?: number } | null } }> };
};

function secretKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  return key;
}

export async function stripeRequest<T>(path: string, options: { method?: "GET" | "POST"; params?: URLSearchParams } = {}) {
  const method = options.method ?? "GET";
  const response = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: method === "POST" ? options.params : undefined,
  });
  const payload = await response.json() as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(payload.error?.message || "Stripe request failed");
  return payload;
}

export async function findOrCreateCustomer(user: { id: string; email: string }) {
  const customers = await stripeRequest<StripeList<StripeCustomer>>(`/customers?email=${encodeURIComponent(user.email)}&limit=1`);
  if (customers.data[0]) return customers.data[0];
  const params = new URLSearchParams({ email: user.email, "metadata[supabase_user_id]": user.id });
  return stripeRequest<StripeCustomer>("/customers", { method: "POST", params });
}

export async function getSubscription(customerId: string) {
  const subscriptions = await stripeRequest<StripeList<StripeSubscription>>(`/subscriptions?customer=${customerId}&status=all&limit=10`);
  return subscriptions.data.find((item) => ["active", "trialing", "past_due"].includes(item.status)) ?? null;
}

export function isEntitled(status?: string | null) {
  return status === "active" || status === "trialing";
}

export async function getAdminSubscriptions() {
  return stripeRequest<StripeList<StripeAdminSubscription>>("/subscriptions?status=all&limit=100&expand[]=data.customer&expand[]=data.items.data.price");
}
