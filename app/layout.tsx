import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";

export const metadata: Metadata = {
  title: "AI 科技胖 VIP｜科技投資研究室",
  description: "追蹤 SpaceX、Tesla 與 AI 科技股的深度投研、每週市場動向與財報拆解。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body><AnalyticsTracker />{children}</body>
    </html>
  );
}
