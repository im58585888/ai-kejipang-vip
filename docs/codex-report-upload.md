# Codex 自动化上传会员报告

网站提供 `POST /api/reports`，管理员页面与 Codex 自动化共用这条发布流程。

## 自动化所需环境变量

- `MEMBER_SITE_URL`：会员网站网址
- `CODEX_UPLOAD_TOKEN`：与网站运行环境相同的长随机密钥

## 报告 manifest

```json
{
  "slug": "member-report-003",
  "reportNo": "003",
  "type": "每週市場與大戶動向",
  "title": "报告标题",
  "description": "报告列表摘要",
  "publishedAt": "2026-07-19",
  "readMinutes": 12,
  "tags": "TSLA, HOOD, VGT",
  "featured": true,
  "markdownPath": "../content/member-report-003.md",
  "pdfPath": "../public/downloads/member-report-003.pdf"
}
```

## Codex 自动化执行命令

```bash
npm run report:upload -- ./report-manifest.json
```

相同 `slug` 再次上传会更新原报告；新 `slug` 会建立新报告。
