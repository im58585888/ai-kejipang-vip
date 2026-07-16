import { requireUser } from "@/lib/server-auth";

export function isAdminEmail(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(adminEmail && email.trim().toLowerCase() === adminEmail);
}

export async function requireAdmin(request: Request) {
  const user = await requireUser(request);
  if (!isAdminEmail(user.email)) throw new Response("Forbidden", { status: 403 });
  return user;
}
