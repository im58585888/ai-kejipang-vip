"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [error, setError] = useState("");
  useEffect(() => { (async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return setError("登入回傳資料不完整，請重新登入。");
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) return setError("登入驗證失敗，請重新登入。");
    const next = sessionStorage.getItem("auth_next") || "/reports";
    sessionStorage.removeItem("auth_next");
    window.location.replace(next.startsWith("/") ? next : "/reports");
  })(); }, []);
  return <main className="auth-loading">{error ? <><div className="auth-error">{error}</div><Link href="/login" className="auth-retry">返回登入</Link></> : <><span className="auth-spinner"><Check size={20} /></span><p>Google 登入成功，正在開啟會員專區…</p></>}</main>;
}
