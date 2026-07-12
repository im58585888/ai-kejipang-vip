import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    return Response.json({ admin: true, email: user.email });
  } catch (error) {
    if (error instanceof Response && (error.status === 401 || error.status === 403)) {
      return Response.json({ admin: false }, { status: error.status });
    }
    return Response.json({ admin: false }, { status: 500 });
  }
}
