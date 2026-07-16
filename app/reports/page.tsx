import { SiteHeader } from "@/components/site-header";
import { AuthGate } from "@/components/auth-gate";
import { MemberAccount } from "@/components/member-account";
import { LibraryReport, ReportLibrary } from "@/components/report-library";

const reports: LibraryReport[] = [
  { featured: true, type: "每週大戶雷達", date: "2026-07-12", title: "每週大戶雷達：誰在買，誰在賣？", description: "聚焦 ARK、國會交易、公司內部人 Form 4 與 13D / 13G 活動派訊號。", tags: ["ARK", "FORM 4", "13D", "HOOD"], readMinutes: 12, href: "/reports/member-report-002" },
  { type: "每週市場與大戶動向", date: "2026-07-05", title: "Tesla 交付創高後重挫：市場正在重新定價什麼？", description: "從 Tesla 股東結構、SpaceX 選擇權到 Q1 13F，拆解 AI 資金的最新方向。", tags: ["TSLA", "SPCX", "HOOD", "VGT"], readMinutes: 18, href: "/reports/member-report-001" },
  { type: "技術型態與 CC", date: "2026-07-03", title: "HOOD 高檔整理，Covered Call 該等哪個訊號？", description: "本週關鍵支撐、壓力區與隱含波動率觀察。", tags: ["HOOD"], readMinutes: 9, href: "#" },
  { type: "財報分析", date: "2026-06-28", title: "Microsoft：AI 投資開始轉成現金流了嗎？", description: "Azure 成長、資本支出與 Copilot 商業化的三個核心問題。", tags: ["MSFT"], readMinutes: 12, href: "#" },
  { type: "深度投研", date: "2026-06-21", title: "SpaceX 上市後的第一份完整估值地圖", description: "Starlink、發射業務與新公開市場估值框架。", tags: ["SPCX"], readMinutes: 22, href: "#" },
];

export default function ReportsPage() {
  return (
    <AuthGate><main className="library-page">
      <SiteHeader dark={false} />
      <section className="library-header">
        <div><span className="section-label">會員專區</span><h1>研究報告</h1><p>所有複雜的市場資訊，都從這裡開始變清楚。</p></div>
        <MemberAccount />
      </section>
      <ReportLibrary fallbackReports={reports} />
    </main></AuthGate>
  );
}
