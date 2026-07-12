import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthGate } from "@/components/auth-gate";
import { SubscribePanel } from "@/components/subscribe-panel";

export default function SubscribePage() {
  return <AuthGate requireSubscription={false}><main className="subscribe-page">
    <Link href="/" className="subscribe-back"><ArrowLeft size={17} /> 返回首頁</Link>
    <section className="subscribe-copy"><span>AI 科技胖 VIP</span><h1>最後一步，<br />開始你的研究優勢。</h1><p>完成訂閱後立即解鎖所有歷史報告，之後每週持續收到最新研究。</p></section>
    <SubscribePanel />
  </main></AuthGate>;
}
