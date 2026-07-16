"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Download } from "lucide-react";
import { AuthGate } from "@/components/auth-gate";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/lib/supabase";

type Report = {
  slug: string;
  reportNo: string;
  type: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  markdown: string;
  hasPdf: boolean;
};

export function UploadedReportReader({ slug }: { slug: string }) {
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const response = await fetch(`/api/reports/${encodeURIComponent(slug)}`, { headers: { Authorization: `Bearer ${data.session.access_token}` } });
      const result = await response.json() as { report?: Report; error?: string };
      if (!active) return;
      if (!response.ok || !result.report) setError(result.error || "无法载入报告。");
      else setReport(result.report);
    });
    return () => { active = false; };
  }, [slug]);

  async function downloadPdf() {
    setDownloading(true);
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    const response = await fetch(`/api/reports/${encodeURIComponent(slug)}/download`, { headers: { Authorization: `Bearer ${data.session.access_token}` } });
    if (!response.ok) {
      setError("PDF 下载失败，请稍后再试。");
      setDownloading(false);
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  }

  return <AuthGate><main className="reader-page">
    <SiteHeader dark={false} />
    {!report && !error && <div className="uploaded-reader-loading"><span className="auth-spinner" /><p>正在载入会员报告…</p></div>}
    {error && <div className="uploaded-reader-loading"><div className="auth-error">{error}</div><Link href="/reports" className="auth-retry">返回所有报告</Link></div>}
    {report && <>
      <div className="reader-progress" />
      <header className="reader-header">
        <Link href="/reports" className="back-link"><ArrowLeft size={17} /> 返回所有報告</Link>
        <div className="reader-type">{report.type} · NO.{report.reportNo}</div>
        <h1>{report.title}</h1>
        <p>{report.description}</p>
        <div className="reader-meta"><span>{report.publishedAt}</span><span>{report.readMinutes} 分鐘閱讀</span></div>
        {report.hasPdf && <div className="reader-actions"><button onClick={downloadPdf} disabled={downloading}><Download size={18} />{downloading ? "下载中…" : "下载 PDF"}</button></div>}
      </header>
      <div className="reader-layout"><article className="markdown-body uploaded-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{report.markdown}</ReactMarkdown></article></div>
    </>}
  </main></AuthGate>;
}
