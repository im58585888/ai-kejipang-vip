"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Copy, FileText, KeyRound, UploadCloud } from "lucide-react";
import { supabase } from "@/lib/supabase";

type UploadResult = {
  report?: { title: string; href: string };
  error?: string;
};

export function AdminReportUploader() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [automationToken, setAutomationToken] = useState("");
  const [creatingToken, setCreatingToken] = useState(false);

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

  async function createAutomationToken() {
    setCreatingToken(true);
    const { data } = await supabase.auth.getSession();
    if (!data.session) return window.location.replace("/login?next=/admin");
    const response = await fetch("/api/admin/report-token", {
      method: "POST",
      headers: { Authorization: `Bearer ${data.session.access_token}` },
    });
    const result = await response.json() as { token?: string; error?: string };
    setCreatingToken(false);
    if (!response.ok || !result.token) return setMessage(result.error || "无法建立 Codex 上传 Token。");
    setAutomationToken(result.token);
  }

  async function copyToken() {
    await navigator.clipboard.writeText(automationToken);
    setMessage("Codex 上传 Token 已复制。");
    setSuccess(true);
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
        <label className="upload-field upload-title"><span>报告标题 *</span><input name="title" required placeholder="輸入新報告標題" /></label>
        <label className="upload-field"><span>报告编号</span><input name="reportNo" placeholder="003" /></label>
        <label className="upload-field"><span>网址 slug</span><input name="slug" placeholder="report-2026-07-01" pattern="[A-Za-z0-9-]*" /></label>
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
      <div className="automation-token-panel">
        <div><KeyRound size={18} /><p><b>Codex 自动化上传</b><span>生成一次性显示的专属 Token，贴到自动化的 CODEX_UPLOAD_TOKEN 环境变量。</span></p></div>
        {!automationToken ? <button onClick={createAutomationToken} disabled={creatingToken}>{creatingToken ? "正在生成…" : "生成上传 Token"}</button> :
          <div className="automation-token-value"><code>{automationToken}</code><button onClick={copyToken} aria-label="复制 Token"><Copy size={16} /></button></div>}
      </div>
    </section>
  );
}
