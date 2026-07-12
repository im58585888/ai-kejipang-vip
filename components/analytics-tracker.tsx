"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function visitorId() {
  const key = "ai-kejipang-visitor";
  let value = localStorage.getItem(key);
  if (!value) { value = crypto.randomUUID(); localStorage.setItem(key, value); }
  return value;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const body = JSON.stringify({ eventType: "page_view", path: pathname, visitorId: visitorId() });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/analytics/track", new Blob([body], { type: "application/json" }));
    else fetch("/api/analytics/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  }, [pathname]);
  return null;
}
