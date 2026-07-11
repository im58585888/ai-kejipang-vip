"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export function MemberAccount() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)); }, []);
  const avatar = user?.user_metadata?.avatar_url as string | undefined;
  const name = (user?.user_metadata?.full_name as string | undefined) || user?.email || "VIP 會員";
  async function signOut() { await supabase.auth.signOut(); window.location.assign("/"); }

  return <div className="member-account">
    {avatar ? <Image src={avatar} alt="" width={42} height={42} className="member-avatar" unoptimized /> : <span className="member-avatar-fallback">VIP</span>}
    <div><b>{name}</b><small>{user?.email ?? "會員帳戶"}</small></div>
    <button onClick={signOut} aria-label="登出"><LogOut size={17} /><span>登出</span></button>
  </div>;
}
