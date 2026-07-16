import { UploadedReportReader } from "@/components/uploaded-report-reader";

export default async function UploadedReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UploadedReportReader slug={slug} />;
}
