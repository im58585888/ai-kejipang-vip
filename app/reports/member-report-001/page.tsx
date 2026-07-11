import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Bookmark, Download, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AuthGate } from "@/components/auth-gate";

export default function ReportPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content/member-report-001.md"), "utf8");
  return (
    <AuthGate><main className="reader-page">
      <SiteHeader dark={false} />
      <div className="reader-progress" />
      <header className="reader-header">
        <Link href="/reports" className="back-link"><ArrowLeft size={17} /> 返回所有報告</Link>
        <div className="reader-type">會員研究報告 · NO.001</div>
        <h1>Tesla 交付創高後重挫：<br />市場正在重新定價什麼？</h1>
        <p>從股東結構、SpaceX 選擇權到 Q1 13F，拆解 AI 資金的最新方向。</p>
        <div className="reader-meta"><span>2026 年 7 月 5 日</span><span>18 分鐘閱讀</span><span>最後更新 7 月 5 日</span></div>
        <div className="reader-actions"><button><Bookmark size={18} /> 收藏</button><button><Download size={18} /> 下載 PDF</button><button><Share2 size={18} /> 分享</button></div>
      </header>
      <div className="reader-layout">
        <aside className="reader-aside"><b>本期內容</b><a href="#本期快速結論">快速結論</a><a href="#1-tesla--spacex--robinhood--vgt-股東與機構法人買賣追蹤">公司追蹤</a><a href="#2-重要投資人的公開持股變化">大戶持股</a><a href="#3-選擇權市場訊號觀察">選擇權訊號</a></aside>
        <article className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></article>
      </div>
    </main></AuthGate>
  );
}
