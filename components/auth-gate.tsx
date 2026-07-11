"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) return router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    });
    return () => { mounted = false; data.subscription.unsubscribe(); };
  }, [pathname, router]);

  if (!ready) return <main className="auth-loading" aria-live="polite"><span className="auth-spinner" /><p>正在確認會員身份…</p></main>;
  return <>{children}</>;
}
