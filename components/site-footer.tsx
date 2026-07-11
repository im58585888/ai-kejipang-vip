import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">AI 科技胖 <span>VIP</span></div>
      <p>把複雜的公開資訊，整理成真正能用的研究。</p>
      <div className="footer-links">
        <Link href="/reports">會員報告</Link><a href="#">使用條款</a><a href="#">隱私政策</a>
      </div>
      <small>© 2026 AI 科技胖。所有內容僅供研究與教育用途，不構成投資建議。</small>
    </footer>
  );
}
