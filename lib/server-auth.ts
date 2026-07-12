const SUPABASE_URL = "https://szevzzryysnujiyuincb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_aopQEW0VurMuNlUjXVxDXA_WohA3ux_";

export type AuthenticatedUser = { id: string; email: string };

export async function requireUser(request: Request): Promise<AuthenticatedUser> {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) throw new Response("Unauthorized", { status: 401 });

  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: authorization, apikey: SUPABASE_PUBLISHABLE_KEY },
  });
  if (!response.ok) throw new Response("Unauthorized", { status: 401 });

  const user = await response.json() as { id?: string; email?: string };
  if (!user.id || !user.email) throw new Response("Unauthorized", { status: 401 });
  return { id: user.id, email: user.email };
}
