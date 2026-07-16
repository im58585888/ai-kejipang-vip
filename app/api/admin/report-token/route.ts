import { getDb } from "@/db";
import { reportUploadTokens } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import { hashReportUploadToken } from "@/lib/member-auth";

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const encoded = btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  return `rpt_${encoded}`;
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    const token = randomToken();
    await getDb().insert(reportUploadTokens).values({
      id: crypto.randomUUID(),
      tokenHash: await hashReportUploadToken(token),
      label: "Codex automation",
      createdBy: user.email,
    });
    return Response.json({ token });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "无法建立 Codex 上传 Token。" }, { status: 500 });
  }
}
