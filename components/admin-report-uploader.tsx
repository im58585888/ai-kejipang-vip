"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
import { supabase } from "@/lib/supabase";

type UploadResult = {
  report?: { title: string; href: string };
  error?: string;
};

export function AdminReportUploader() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function uploadReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setMessage("");
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      window.location.replace("/login?next=/admin");
      return;
    }

    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { Authorization: `Bearer ${data.session.access_token}` },
      body: formData,
    });
    const result = await response.json() as UploadResult;
    setUploading(false);

    if (!response.ok) {
      setMessage(result.error || "报告上传失败，请稍后再试。");
      return;
    }

    setSuccess(true);
    setMessage(`「${result.report?.title || "新报告"}」已发布到 Member Access。`);
    form.reset();
  }

  return (
    <section className="admin-report-upload" id="report-upload">
      <div className="admin-upload-heading">
        <div>
          <span className="admin-upload-icon"><UploadCloud size={20} /></span>
          <div><h2>上传会员报告</h2><p>上传 Markdown 正文与 PDF 后，会立即加入 Member Access 报告库。</p></div>
        </div>
        <span>管理员 / Codex 自动化共用发布流程</span>
      </div>
      <form className="report-upload-form" onSubmit={uploadReport}>
        <label className="upload-field upload-title"><span>报告标题 *</span><input name="title" required placeholder="例如：每週大戶雷達：誰在買，誰在賣？" /></label>
        <label className="upload-field"><span>报告编号</span><input name="reportNo" placeholder="003" /></label>
        <label className="upload-field"><span>网址 slug</span><input name="slug" placeholder="member-report-003" pattern="[A-Za-z0-9-]*" /></label>
        <label className="upload-field"><span>报告类别</span><input name="type" placeholder="每週市場與大戶動向" /></label>
        <label className="upload-field"><span>发布日期 *</span><input name="publishedAt" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} /></label>
        <label className="upload-field"><span>阅读时间</span><input name="readMinutes" type="number" min="1" max="180" defaultValue="12" /></label>
        <label className="upload-field upload-wide"><span>摘要</span><textarea name="description" rows={2} placeholder="显示在报告列表中的简短介绍" /></label>
        <label className="upload-field upload-wide"><span>标签</span><input name="tags" placeholder="TSLA, HOOD, VGT（用逗号分隔）" /></label>
        <label className="upload-file">
          <FileText size={20} />
          <span><b>Markdown 正文 *</b><small>上传 .md 档案，最大 2MB</small></span>
          <input name="markdownFile" type="file" accept=".md,text/markdown,text/plain" required />
        </label>
        <label className="upload-file">
          <FileText size={20} />
          <span><b>PDF 下载档</b><small>选填，最大 20MB</small></span>
          <input name="pdf" type="file" accept="application/pdf,.pdf" />
        </label>
        <label className="upload-featured"><input name="featured" type="checkbox" /> 设为本期主打报告</label>
        <button className="admin-publish-button" type="submit" disabled={uploading}>
          <UploadCloud size={17} />{uploading ? "正在上传…" : "发布到 Member Access"}
        </button>
      </form>
      {message && <div className={`upload-message ${success ? "success" : "error"}`}>{success && <CheckCircle2 size={17} />}{message}</div>}
    </section>
  );
}
