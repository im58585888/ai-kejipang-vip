"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CreditCard, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export function MemberAccount() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)); }, []);
  const avatar = user?.user_metadata?.avatar_url as string | undefined;
  const name = (user?.user_metadata?.full_name as string | undefined) || user?.email || "VIP 會員";
  async function signOut() { await supabase.auth.signOut(); window.location.assign("/"); }
  async function manageSubscription() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    const response = await fetch("/api/stripe/portal", { method: "POST", headers: { Authorization: `Bearer ${data.session.access_token}` } });
    const result = await response.json() as { url?: string };
    if (result.url) window.location.assign(result.url);
  }

  return <div className="member-account">
    {avatar ? <Image src={avatar} alt="" width={42} height={42} className="member-avatar" unoptimized /> : <span className="member-avatar-fallback">VIP</span>}
    <div><b>{name}</b><small>{user?.email ?? "會員帳戶"}</small></div>
    <button onClick={manageSubscription} aria-label="管理訂閱"><CreditCard size={17} /><span>訂閱</span></button>
    <button onClick={signOut} aria-label="登出"><LogOut size={17} /><span>登出</span></button>
  </div>;
}
