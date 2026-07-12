"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { supabase.auth.getSession().then(({ data }) => { if (data.session) window.location.replace(new URLSearchParams(window.location.search).get("next") || "/reports"); }); }, []);

  async function signInWithGoogle() {
    setLoading(true); setError("");
    const next = new URLSearchParams(window.location.search).get("next") || "/reports";
    sessionStorage.setItem("auth_next", next.startsWith("/") ? next : "/reports");
    const { error: signInError } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    if (signInError) { setError("目前無法連接 Google，請稍後再試。"); setLoading(false); }
  }

  return <main className="login-page">
    <section className="login-brand-panel">
      <Link href="/" className="login-back"><ArrowLeft size={17} /> 返回首頁</Link>
      <div className="login-brand-copy"><span>AI 科技胖 VIP</span><h1>研究不必<br />從零開始。</h1><p>一次登入，解鎖所有歷史報告與每週最新研究。</p></div>
      <div className="login-signal" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
    </section>
    <section className="login-form-panel"><div className="login-form">
      <Image src="/brand/ai-kejipang-logo-mark.png" alt="AI 科技胖" width={64} height={64} className="login-logo" unoptimized />
      <span className="section-label">會員登入</span><h2>歡迎回來</h2>
      <p>使用 Google 帳號登入；第一次登入時會自動建立會員帳戶。</p>
      <button className="google-login-button" onClick={signInWithGoogle} disabled={loading}><span className="google-g">G</span>{loading ? "正在連接 Google…" : "使用 Google 帳號繼續"}<ArrowRight size={18} /></button>
      {error && <div className="auth-error" role="alert">{error}</div>}
      <small><ShieldCheck size={15} /> 登入由 Google 與 Supabase 安全處理；本站不會取得你的 Google 密碼。</small>
    </div></section>
  </main>;
}
