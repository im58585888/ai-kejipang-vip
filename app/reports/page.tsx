import { SiteHeader } from "@/components/site-header";
import { AuthGate } from "@/components/auth-gate";
import { MemberAccount } from "@/components/member-account";
import { ReportLibrary } from "@/components/report-library";

export default function ReportsPage() {
  return (
    <AuthGate><main className="library-page">
      <SiteHeader dark={false} />
      <section className="library-header">
        <div><span className="section-label">會員專區</span><h1>研究報告</h1><p>所有複雜的市場資訊，都從這裡開始變清楚。</p></div>
        <MemberAccount />
      </section>
      <ReportLibrary fallbackReports={[]} />
    </main></AuthGate>
  );
}
