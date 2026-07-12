"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, CreditCard, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function SubscribePanel() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(params.get("checkout") === "cancelled" ? "付款尚未完成，你可以隨時重新開始。" : "");

  useEffect(() => {
    if (params.get("checkout") !== "success") return;
    let attempts = 0;
    const verify = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const response = await fetch("/api/stripe/status", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
      const status = response.ok ? await response.json() as { active?: boolean } : null;
      if (status?.active) return router.replace("/reports");
      attempts += 1;
      if (attempts < 6) setTimeout(verify, 1200);
      else setMessage("付款已送出，訂閱狀態仍在同步，請稍後重新整理。");
    };
    verify();
  }, [params, router]);

  async function checkout() {
    setLoading(true); setMessage("");
    const { data } = await supabase.auth.getSession();
    if (!data.session) return router.replace("/login?next=/subscribe");
    const response = await fetch("/api/stripe/checkout", { method: "POST", headers: { Authorization: `Bearer ${data.session.access_token}` } });
    const result = await response.json() as { url?: string; error?: string };
    if (result.url) window.location.assign(result.url);
    else { setMessage(result.error || "目前無法開啟付款頁面。"); setLoading(false); }
  }

  return <div className="subscribe-card">
    <div className="subscribe-price"><span>US$</span><strong>9.99</strong><small>／月</small></div>
    <ul>
      <li><Check size={18} /> 解鎖所有歷史研究報告</li>
      <li><Check size={18} /> 每週市場、大戶與技術型態更新</li>
      <li><Check size={18} /> PDF 下載與會員專屬內容</li>
      <li><Check size={18} /> 隨時可在會員中心取消</li>
    </ul>
    <button onClick={checkout} disabled={loading} className="stripe-checkout-button"><CreditCard size={18} />{loading ? "正在開啟安全付款…" : "前往安全付款"}<ArrowRight size={18} /></button>
    {message && <p className="subscribe-message" role="status">{message}</p>}
    <small><ShieldCheck size={14} /> 付款由 Stripe 安全處理，本站不會儲存你的信用卡資料。</small>
  </div>;
}
