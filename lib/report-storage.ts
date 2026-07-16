import { env } from "cloudflare:workers";

export function getReportBucket() {
  const bucket = (env as unknown as { REPORTS?: R2Bucket }).REPORTS;
  if (!bucket) throw new Error("Cloudflare R2 binding REPORTS is unavailable");
  return bucket;
}
