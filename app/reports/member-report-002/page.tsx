import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Bookmark, Download, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AuthGate } from "@/components/auth-gate";

export default function ReportPage() {
  const content = fs.readFileSync(path.join(process.cwd(), "content/member-report-002.md"), "utf8");
  return (
    <AuthGate><main className="reader-page">
      <SiteHeader dark={false} />
      <div className="reader-progress" />
      <header className="reader-header">
        <Link href="/reports" className="back-link"><ArrowLeft size={17} /> 返回所有報告</Link>
        <div className="reader-type">會員研究報告 · NO.002</div>
        <h1>每週大戶雷達：<br />誰在買，誰在賣？</h1>
        <p>聚焦 ARK、國會交易、公司內部人 Form 4 與 13D / 13G 活動派訊號。</p>
        <div className="reader-meta"><span>2026 年 7 月 12 日</span><span>12 分鐘閱讀</span><span>最後更新 7 月 12 日</span></div>
        <div className="reader-actions">
          <button><Bookmark size={18} /> 收藏</button>
          <a href="/api/downloads/member-report-002"><Download size={18} /> 下載 PDF</a>
          <button><Share2 size={18} /> 分享</button>
        </div>
      </header>
      <div className="reader-layout">
        <aside className="reader-aside"><b>本期內容</b><a href="#本期快速結論">快速結論</a><a href="#1-ark--cathie-wood-雷達">ARK 雷達</a><a href="#2-國會交易雷達">國會交易</a><a href="#3-公司內部人-form-4-雷達">Form 4</a><a href="#4-13d--13g-活動派雷達">13D / 13G</a></aside>
        <article className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></article>
      </div>
    </main></AuthGate>
  );
}
