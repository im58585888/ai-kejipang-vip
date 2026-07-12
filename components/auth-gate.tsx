"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthGate({ children, requireSubscription = true }: { children: React.ReactNode; requireSubscription?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      if (!data.session) return router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      if (requireSubscription) {
        const response = await fetch("/api/stripe/status", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
        const status = response.ok ? await response.json() as { active?: boolean } : null;
        if (!mounted) return;
        if (!status?.active) return router.replace("/subscribe");
      }
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    });
    return () => { mounted = false; data.subscription.unsubscribe(); };
  }, [pathname, requireSubscription, router]);

  if (!ready) return <main className="auth-loading" aria-live="polite"><span className="auth-spinner" /><p>正在確認會員身份…</p></main>;
  return <>{children}</>;
}
