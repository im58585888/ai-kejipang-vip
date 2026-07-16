import fs from "node:fs/promises";
import path from "node:path";

const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error("Usage: npm run report:upload -- ./report-manifest.json");
  process.exit(1);
}

const siteUrl = process.env.MEMBER_SITE_URL?.replace(/\/+$/, "");
const token = process.env.CODEX_UPLOAD_TOKEN;
if (!siteUrl || !token) {
  console.error("MEMBER_SITE_URL and CODEX_UPLOAD_TOKEN are required.");
  process.exit(1);
}

const absoluteManifestPath = path.resolve(manifestPath);
const manifest = JSON.parse(await fs.readFile(absoluteManifestPath, "utf8"));
const baseDir = path.dirname(absoluteManifestPath);
const markdownPath = path.resolve(baseDir, manifest.markdownPath);
const form = new FormData();

for (const field of ["slug", "reportNo", "type", "title", "description", "publishedAt", "readMinutes", "tags", "featured"]) {
  if (manifest[field] !== undefined) form.set(field, String(manifest[field]));
}

const markdown = await fs.readFile(markdownPath);
form.set("markdownFile", new File([markdown], path.basename(markdownPath), { type: "text/markdown" }));

if (manifest.pdfPath) {
  const pdfPath = path.resolve(baseDir, manifest.pdfPath);
  const pdf = await fs.readFile(pdfPath);
  form.set("pdf", new File([pdf], path.basename(pdfPath), { type: "application/pdf" }));
}

const response = await fetch(`${siteUrl}/api/reports`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: form,
});
const result = await response.json();
if (!response.ok) {
  console.error(result.error || `Upload failed (${response.status})`);
  process.exit(1);
}

console.log(`Published: ${result.report.title}`);
console.log(`${siteUrl}${result.report.href}`);
