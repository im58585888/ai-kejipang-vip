import Link from "next/link";
import { ArrowRight, Bookmark, ChevronDown, Download, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AuthGate } from "@/components/auth-gate";
import { MemberAccount } from "@/components/member-account";

const reports = [
  { featured: true, type: "每週市場與大戶動向", date: "2026.07.05", title: "Tesla 交付創高後重挫：市場正在重新定價什麼？", desc: "從 Tesla 股東結構、SpaceX 選擇權到 Q1 13F，拆解 AI 資金的最新方向。", tags: ["TSLA", "SPCX", "HOOD", "VGT"], read: "18 分鐘" },
  { type: "技術型態與 CC", date: "2026.07.03", title: "HOOD 高檔整理，Covered Call 該等哪個訊號？", desc: "本週關鍵支撐、壓力區與隱含波動率觀察。", tags: ["HOOD"], read: "9 分鐘" },
  { type: "財報分析", date: "2026.06.28", title: "Microsoft：AI 投資開始轉成現金流了嗎？", desc: "Azure 成長、資本支出與 Copilot 商業化的三個核心問題。", tags: ["MSFT"], read: "12 分鐘" },
  { type: "深度投研", date: "2026.06.21", title: "SpaceX 上市後的第一份完整估值地圖", desc: "Starlink、發射業務與新公開市場估值框架。", tags: ["SPCX"], read: "22 分鐘" },
];

export default function ReportsPage() {
  return (
    <AuthGate><main className="library-page">
      <SiteHeader dark={false} />
      <section className="library-header">
        <div><span className="section-label">會員專區</span><h1>研究報告</h1><p>所有複雜的市場資訊，都從這裡開始變清楚。</p></div>
        <MemberAccount />
      </section>
      <section className="library-toolbar">
        <div className="search-box"><Search size={19} /><input aria-label="搜尋報告" placeholder="搜尋公司、ticker 或主題" /></div>
        <button>所有類別 <ChevronDown size={17} /></button><button>最新發布 <ChevronDown size={17} /></button>
      </section>
      <div className="company-filter">{["全部", "SPCX", "TSLA", "GOOG", "HOOD", "UBER", "MSFT"].map((x, i) => <button className={i === 0 ? "active" : ""} key={x}>{x}</button>)}</div>
      <section className="reports-grid">
        {reports.map((report, index) => (
          <article className={`library-report ${report.featured ? "library-featured" : ""}`} key={report.title}>
            <div className="library-report-art"><span>{String(index + 1).padStart(2, "0")}</span><div className="mini-chart"><i/><i/><i/><i/><i/></div></div>
            <div className="library-report-main">
              <div className="report-meta"><span>{report.type}</span><i />{report.date}<i />{report.read}</div>
              <h2>{report.title}</h2><p>{report.desc}</p>
              <div className="library-tags">{report.tags.map(t => <span key={t}>{t}</span>)}</div>
              <Link href={index === 0 ? "/reports/member-report-001" : "#"}>閱讀報告 <ArrowRight size={17} /></Link>
            </div>
            <div className="report-quick-actions"><button aria-label="收藏"><Bookmark size={19} /></button><button aria-label="下載"><Download size={19} /></button></div>
          </article>
        ))}
      </section>
    </main></AuthGate>
  );
}
