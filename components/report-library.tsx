"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, ChevronDown, Download, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

export type LibraryReport = {
  featured?: boolean;
  type: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  readMinutes: number;
  href: string;
  slug?: string;
};

export function ReportLibrary({ fallbackReports }: { fallbackReports: LibraryReport[] }) {
  const [uploadedReports, setUploadedReports] = useState<LibraryReport[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const response = await fetch("/api/reports", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
      if (!response.ok) return;
      const result = await response.json() as {
        reports: Array<{ featured: boolean; type: string; date: string; title: string; description: string; tags: string[]; readMinutes: number; href: string; slug: string }>;
      };
      if (active) setUploadedReports(result.reports);
    });
    return () => { active = false; };
  }, []);

  const reports = useMemo(() => {
    const uploadedHrefs = new Set(uploadedReports.map((report) => report.href));
    const combined = [...uploadedReports, ...fallbackReports.filter((report) => !uploadedHrefs.has(report.href))];
    const term = query.trim().toLowerCase();
    if (!term) return combined;
    return combined.filter((report) => [report.title, report.description, report.type, ...report.tags].some((value) => value.toLowerCase().includes(term)));
  }, [fallbackReports, query, uploadedReports]);

  return <>
    <section className="library-toolbar">
      <div className="search-box"><Search size={19} /><input aria-label="搜尋報告" placeholder="搜尋公司、ticker 或主題" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <button>所有類別 <ChevronDown size={17} /></button><button>最新發布 <ChevronDown size={17} /></button>
    </section>
    <div className="company-filter">{["全部", "SPCX", "TSLA", "GOOG", "HOOD", "UBER", "MSFT"].map((x, i) => <button className={i === 0 ? "active" : ""} key={x}>{x}</button>)}</div>
    <section className="reports-grid">
      {reports.map((report, index) => (
        <article className={`library-report ${report.featured ? "library-featured" : ""}`} key={`${report.href}-${report.title}`}>
          <div className="library-report-art"><span>{String(index + 1).padStart(2, "0")}</span><div className="mini-chart"><i/><i/><i/><i/><i/></div></div>
          <div className="library-report-main">
            <div className="report-meta"><span>{report.type}</span><i />{report.date.replaceAll("-", ".")}<i />{report.readMinutes} 分鐘</div>
            <h2>{report.title}</h2><p>{report.description}</p>
            <div className="library-tags">{report.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link href={report.href}>閱讀報告 <ArrowRight size={17} /></Link>
          </div>
          <div className="report-quick-actions"><button aria-label="收藏"><Bookmark size={19} /></button><button aria-label="下載"><Download size={19} /></button></div>
        </article>
      ))}
      {!reports.length && <p className="library-empty">找不到符合条件的报告。</p>}
    </section>
  </>;
}
