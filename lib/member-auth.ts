import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { reportUploadTokens } from "@/db/schema";
import { isAdminEmail } from "@/lib/admin-auth";
import { isManualMemberEmail } from "@/lib/manual-members";
import { requireUser } from "@/lib/server-auth";
import { findOrCreateCustomer, getSubscription, isEntitled } from "@/lib/stripe";

export async function requireMemberAccess(request: Request) {
  const user = await requireUser(request);
  if (isAdminEmail(user.email)) return { user, accessSource: "admin" as const };
  if (isManualMemberEmail(user.email)) return { user, accessSource: "manual_member" as const };
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
  if (authorization?.startsWith("Bearer rpt_")) {
    const tokenHash = await hashReportUploadToken(authorization.slice(7));
    const matches = await getDb().select().from(reportUploadTokens)
      .where(and(eq(reportUploadTokens.tokenHash, tokenHash), isNull(reportUploadTokens.revokedAt))).limit(1);
    if (matches[0]) {
      await getDb().update(reportUploadTokens).set({ lastUsedAt: new Date().toISOString() })
        .where(eq(reportUploadTokens.id, matches[0].id));
      return { createdBy: `codex-automation:${matches[0].id}`, accessSource: "automation" as const };
    }
    throw new Response("Unauthorized", { status: 401 });
  }

  const user = await import("@/lib/admin-auth").then(({ requireAdmin }) => requireAdmin(request));
  return { createdBy: user.email, accessSource: "admin" as const };
}

export async function hashReportUploadToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
