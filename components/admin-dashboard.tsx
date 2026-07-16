"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Download, FileText, RefreshCw, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AdminReportUploader } from "@/components/admin-report-uploader";

type Overview = {
  metrics: { activeMembers: number; mrr: number; downloads: number; visitors: number; views: number; canceled30d: number };
  daily: Array<{ day: string; views: number }>;
  popular: Array<{ path: string; views: number }>;
  members: Array<{ id: string; email: string; name: string; status: string; cancelAtPeriodEnd: boolean; periodEnd: number | null }>;
  generatedAt: string;
};

const statusText: Record<string, string> = { active: "有效", trialing: "試用", past_due: "付款逾期", canceled: "已取消", incomplete: "未完成", unpaid: "未付款" };

export function AdminDashboard() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true); setError("");
    const { data: auth } = await supabase.auth.getSession();
    if (!auth.session) { window.location.replace("/login?next=/admin"); return; }
    const response = await fetch("/api/admin/overview", { headers: { Authorization: `Bearer ${auth.session.access_token}` } });
    if (response.status === 403) { setError("這個帳號沒有管理員權限。"); setLoading(false); return; }
    if (!response.ok) { setError("目前無法載入營運資料，請稍後再試。"); setLoading(false); return; }
    setData(await response.json()); setLoading(false);
  }

  useEffect(() => { load(); }, []);
  if (loading) return <main className="auth-loading"><span className="auth-spinner" /><p>正在載入真實營運資料…</p></main>;
  if (error || !data) return <main className="auth-loading"><div className="auth-error">{error}</div><a href="/" className="auth-retry">返回首頁</a></main>;

  const maxViews = Math.max(...data.daily.map((item) => item.views), 1);
  return <main className="admin-page">
    <aside className="admin-sidebar"><div className="admin-brand"><span />AI 科技胖 <b>VIP</b></div><nav><a className="active">營運總覽</a><a className="member-access-link" href="/reports" target="_blank" rel="noreferrer"><span>Member Access</span><ArrowUpRight size={14} /></a><a href="#report-upload">上传报告</a><a href="#members">會員管理</a><a href="#traffic">流量分析</a><a href="#downloads">下載紀錄</a></nav><div className="admin-user"><span>胖</span><div><b>網站管理員</b><small>Stripe 正式資料</small></div></div></aside>
    <section className="admin-workspace">
      <header className="admin-top"><div><h1>營運總覽</h1><p>更新時間 {new Date(data.generatedAt).toLocaleString("zh-TW")}</p></div><div><a className="admin-new" href="#report-upload">上传报告</a><button className="admin-refresh" onClick={load}><RefreshCw size={17}/>重新整理</button></div></header>
      <div className="admin-metrics">
        <div><span>有效付費會員</span><strong>{data.metrics.activeMembers.toLocaleString()}</strong><small className="up"><ArrowUpRight size={14}/> Stripe 即時狀態</small></div>
        <div><span>每月經常性收入</span><strong>US${data.metrics.mrr.toFixed(2)}</strong><small>依有效訂閱換算</small></div>
        <div id="downloads"><span>報告下載</span><strong>{data.metrics.downloads.toLocaleString()}</strong><small>自追蹤上線起</small></div>
        <div><span>近 30 日取消</span><strong>{data.metrics.canceled30d}</strong><small>Stripe 已取消訂閱</small></div>
      </div>
      <section className="admin-chart-section" id="traffic"><div className="chart-heading"><div><h2>網站流量</h2><p>最近 14 天頁面瀏覽；自追蹤上線起累積</p></div><strong>{data.metrics.visitors.toLocaleString()} <small>不重複訪客</small></strong></div><div className="bar-chart">{data.daily.length ? data.daily.map((item)=><div key={item.day}><i style={{height:`${Math.max(5, Math.round(item.views / maxViews * 130))}px`}} title={`${item.views} 次瀏覽`}/><span>{item.day.slice(5)}</span></div>) : <p className="admin-empty">等待第一批流量資料</p>}</div></section>
      <div className="admin-bottom">
        <section><div className="admin-section-title"><h2>熱門頁面</h2><span>{data.metrics.views} 次瀏覽</span></div>{data.popular.length ? data.popular.map((item,i)=><div className="popular-row" key={item.path}><span>{i+1}</span><div><b>{item.path}</b><small>真實頁面瀏覽</small></div><strong>{item.views}</strong></div>) : <p className="admin-empty">尚無頁面瀏覽資料</p>}</section>
        <section><div className="admin-section-title"><h2>營運狀態</h2></div><div className="activity-row"><Users/><p><b>{data.metrics.activeMembers} 位有效會員</b><span>来自 Stripe 正式訂閱</span></p></div><div className="activity-row"><FileText/><p><b>{data.metrics.views} 次頁面瀏覽</b><span>自本功能上線後開始計算</span></p></div><div className="activity-row"><Download/><p><b>{data.metrics.downloads} 次報告下載</b><span>透過網站下載連結追蹤</span></p></div></section>
      </div>
      <AdminReportUploader />
      <section className="admin-members" id="members"><div className="admin-section-title"><div><h2>付費會員管理</h2><p>来自 Stripe；尚未付款的 Google 註冊者不包含在此表</p></div><span>{data.members.length} 筆訂閱</span></div><div className="admin-member-table"><div className="admin-member-row admin-member-head"><span>會員</span><span>狀態</span><span>本期結束</span></div>{data.members.map((member)=><div className="admin-member-row" key={member.id}><span><b>{member.name}</b><small>{member.email}</small></span><span><i className={`status-dot status-${member.status}`}/>{member.cancelAtPeriodEnd ? "已排程取消" : statusText[member.status] || member.status}</span><span>{member.periodEnd ? new Date(member.periodEnd * 1000).toLocaleDateString("zh-TW") : "—"}</span></div>)}</div></section>
    </section>
  </main>;
}
