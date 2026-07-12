import { requireUser } from "@/lib/server-auth";

export async function requireAdmin(request: Request) {
  const user = await requireUser(request);
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!adminEmail || user.email.toLowerCase() !== adminEmail) throw new Response("Forbidden", { status: 403 });
  return user;
}
