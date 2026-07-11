import { ArrowDownRight, ArrowUpRight, Bell, Download, FileText, Search, Users } from "lucide-react";

const bars = [42, 55, 48, 67, 72, 63, 88, 81, 92, 76, 95, 100, 84, 108];
export default function AdminPage() {
  return (
    <main className="admin-page">
      <aside className="admin-sidebar"><div className="admin-brand"><span />AI 科技胖 <b>VIP</b></div><nav><a className="active">總覽</a><a>研究報告</a><a>會員管理</a><a>下載紀錄</a><a>流量分析</a><a>設定</a></nav><div className="admin-user"><span>胖</span><div><b>網站管理員</b><small>admin@aipang.com</small></div></div></aside>
      <section className="admin-workspace">
        <header className="admin-top"><div><h1>營運總覽</h1><p>2026 年 7 月 10 日，星期五</p></div><div><button><Search size={19}/></button><button><Bell size={19}/></button><button className="admin-new">＋ 新增報告</button></div></header>
        <div className="admin-metrics">
          <div><span>有效會員</span><strong>1,248</strong><small className="up"><ArrowUpRight size={14}/> 12.4% 本月</small></div>
          <div><span>本月經常性收入</span><strong>US$12.4K</strong><small className="up"><ArrowUpRight size={14}/> 8.2% 本月</small></div>
          <div><span>報告下載</span><strong>3,892</strong><small className="up"><ArrowUpRight size={14}/> 21.6% 本月</small></div>
          <div><span>取消率</span><strong>2.8%</strong><small className="down"><ArrowDownRight size={14}/> 0.4% 本月</small></div>
        </div>
        <section className="admin-chart-section"><div className="chart-heading"><div><h2>網站流量</h2><p>最近 14 天的不重複訪客</p></div><strong>8,426 <small>訪客</small></strong></div><div className="bar-chart">{bars.map((h,i)=><div key={i}><i style={{height:`${h}px`}}/><span>{i % 3 === 0 ? `${i+1}日` : ""}</span></div>)}</div></section>
        <div className="admin-bottom">
          <section><div className="admin-section-title"><h2>熱門報告</h2><button>查看全部</button></div>
            {["Tesla 交付創高後重挫","SpaceX 上市後估值地圖","HOOD 高檔整理與 CC"].map((x,i)=><div className="popular-row" key={x}><span>{i+1}</span><div><b>{x}</b><small>{["1,804 次閱讀","1,275 次閱讀","986 次閱讀"][i]}</small></div><strong>{["642","488","357"][i]} <Download size={14}/></strong></div>)}
          </section>
          <section><div className="admin-section-title"><h2>最近動態</h2><button>查看全部</button></div>
            <div className="activity-row"><Users/><p><b>12 位新會員</b><span>透過 Google 完成註冊</span></p><small>8 分鐘前</small></div>
            <div className="activity-row"><FileText/><p><b>會員報告 #001</b><span>獲得 42 次新下載</span></p><small>1 小時前</small></div>
            <div className="activity-row"><Users/><p><b>3 位會員取消</b><span>月底停止會員權限</span></p><small>3 小時前</small></div>
          </section>
        </div>
      </section>
    </main>
  );
}
