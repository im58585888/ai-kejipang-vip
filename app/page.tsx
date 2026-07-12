import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, Download, FileText, LineChart, Play, Sparkles, Youtube } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const tickers = [
  ["SPCX", "SpaceX", "+2.8%"], ["TSLA", "Tesla", "+1.4%"], ["GOOG", "Alphabet", "+0.7%"],
  ["HOOD", "Robinhood", "+3.2%"], ["UBER", "Uber", "+0.4%"], ["MSFT", "Microsoft", "+0.9%"],
];

const benefits = [
  { no: "01", icon: FileText, title: "每季深度投研報告", text: "每季從商業模式、財務數字到估值邏輯，更新真正值得長期研究的科技公司。" },
  { no: "02", icon: BarChart3, title: "每週市場與大戶動向", text: "整理機構 13F、知名投資人與政治人物公開交易，判讀資金正在往哪裡移動。" },
  { no: "03", icon: LineChart, title: "每週五技術型態與 CC", text: "追蹤關鍵價位、趨勢結構與 Covered Call 機會，不用盯盤也能掌握週末功課。" },
  { no: "04", icon: Play, title: "財報與科技訪談拆解", text: "把財報電話會議和重要科技訪談，濃縮成會員真正需要知道的決策資訊。" },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image src="/images/rocket-hero.png" alt="火箭在夜間發射" fill priority className="hero-image" sizes="100vw" unoptimized />
        <div className="hero-shade" />
        <SiteHeader />
        <div className="hero-copy">
          <div className="eyebrow"><span /> 科技投資研究室</div>
          <h1>看懂下一個<br /><em>爆發點。</em></h1>
          <p>深度追蹤 SpaceX、Tesla 與 AI 科技股。<br />不追逐雜訊，只整理真正影響投資判斷的訊號。</p>
          <div className="hero-actions">
            <Link href="#pricing" className="primary-button">加入 VIP <ArrowRight size={18} /></Link>
            <Link href="/reports" className="text-button">先看報告 <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-meta"><span>每週更新</span><span>繁體中文</span><span>US$9.99／月</span></div>
        <a href="#signal" className="scroll-cue"><span>往下探索</span><i /></a>
      </section>

      <section id="signal" className="ticker-section">
        <div className="ticker-intro"><span>核心追蹤</span><p>一個會員方案，掌握六家改變未來的公司。</p></div>
        <div className="ticker-list">
          {tickers.map(([ticker, name, move]) => (
            <div className="ticker-row" key={ticker}>
              <b>{ticker}</b><span>{name}</span><i>{move}</i><ChevronRight size={20} />
            </div>
          ))}
        </div>
      </section>

      <section className="featured-report">
        <div className="report-visual">
          <span className="report-kicker">會員研究報告</span>
          <div className="report-number">001</div>
          <div className="signal-line"><span /><span /><span /><span /><span /></div>
          <div className="report-symbols">TSLA · SPCX · HOOD · VGT</div>
        </div>
        <div className="report-copy">
          <span className="section-label">本週精選 · 2026.07.05</span>
          <h2>好消息之後，<br />市場為什麼反而賣出？</h2>
          <p>Tesla 交付數字大幅超預期，股價卻重挫。本期從機構持股、SpaceX 選擇權與 AI 資金流向，拆解市場真正正在定價的風險。</p>
          <div className="report-tags"><span>Tesla</span><span>SpaceX</span><span>13F</span><span>選擇權</span></div>
          <div className="report-links">
            <Link href="/reports/member-report-001" className="underlined-link">閱讀線上版本 <ArrowRight size={18} /></Link>
            <a href="/downloads/AI科技胖會員研究報告_001_2026-07-05.pdf" download className="sample-download"><Download size={17} /> 免費下載 Sample PDF</a>
          </div>
        </div>
      </section>

      <section id="youtube" className="youtube-section">
        <div className="youtube-logo-wrap">
          <Image src="/brand/ai-kejipang-logo-green.png" alt="AI 科技胖頻道 Logo" width={720} height={720} className="youtube-logo" unoptimized />
        </div>
        <div className="youtube-copy">
          <span className="section-label"><Youtube size={17} /> 免費 YouTube 頻道</span>
          <h2>先從免費內容，<br />認識 AI 科技胖。</h2>
          <p>用最直白的方式拆解 AI、科技趨勢與投資機會。VIP 會員則在影片之外，獲得更完整的數據、研究框架與持續追蹤。</p>
          <a href="https://www.youtube.com/@tech_alpha858" target="_blank" rel="noreferrer" className="youtube-button">前往 YouTube 頻道 <ArrowUpRight size={18} /></a>
        </div>
      </section>

      <section id="benefits" className="benefits-section">
        <div className="benefits-heading">
          <span className="section-label">你會收到什麼</span>
          <h2>不是更多資訊。<br /><em>是更清楚的判斷。</em></h2>
        </div>
        <div className="benefit-list">
          {benefits.map(({ no, icon: Icon, title, text }) => (
            <article className="benefit-row" key={no}>
              <span className="benefit-no">{no}</span><Icon className="benefit-icon" />
              <h3>{title}</h3><p>{text}</p><ArrowUpRight className="benefit-arrow" />
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <Sparkles size={26} />
        <p>免費影片告訴你<em>發生了什麼</em>。<br />VIP 研究告訴你<em>為什麼重要</em>。</p>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="pricing-copy">
          <span className="section-label">AI 科技胖 VIP</span>
          <h2>把研究，<br />變成你的投資優勢。</h2>
          <p>加入後立即解鎖所有歷史報告，之後每週持續收到最新研究。</p>
        </div>
        <div className="pricing-panel">
          <div className="price"><span>US$</span><strong>9.99</strong><small>／月</small></div>
          <ul>
            <li><Check size={18} /> 每季更新深度投研報告</li>
            <li><Check size={18} /> 六大核心科技公司持續追蹤</li>
            <li><Check size={18} /> 每週五技術型態與 CC 報告</li>
            <li><Check size={18} /> PDF 下載與會員專屬內容</li>
          </ul>
          <Link href="/login?next=/subscribe" className="google-button"><span className="google-g">G</span> 使用 Google 帳號加入 <ArrowRight size={18} /></Link>
          <small>使用 Google 安全登入；信用卡付款由 Stripe 加密處理。</small>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
