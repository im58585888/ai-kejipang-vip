import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";

export function SiteHeader({ dark = true }: { dark?: boolean }) {
  return (
    <header className={`site-header ${dark ? "header-dark" : "header-light"}`}>
      <Link href="/" className="brand" aria-label="AI 科技胖 VIP 首頁">
        <Image src="/brand/ai-kejipang-logo-green.png" alt="" width={36} height={36} className="brand-logo" />
        <span>AI 科技胖</span>
        <b>VIP</b>
      </Link>
      <nav className="desktop-nav" aria-label="主要導覽">
        <Link href="/reports">研究報告</Link>
        <Link href="/#benefits">會員內容</Link>
        <Link href="/#youtube">免費頻道</Link>
        <Link href="/#pricing">方案</Link>
      </nav>
      <div className="header-actions">
        <Link className="login-link" href="/reports">登入</Link>
        <Link className="nav-cta" href="/#pricing">加入 VIP <ArrowUpRight size={16} /></Link>
        <button className="menu-button" aria-label="開啟選單"><Menu /></button>
      </div>
    </header>
  );
}
