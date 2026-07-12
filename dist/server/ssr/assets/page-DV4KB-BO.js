import { T as __toESM, b as require_react, t as require_jsx_runtime } from "../index.js";
import Link from "./link-DnBoYv7B.js";
import { t as Check } from "./check-Cuh-VUwe.js";
import { t as supabase } from "./supabase-BbqHW971.js";
//#region app/auth/callback/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AuthCallbackPage() {
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		(async () => {
			const code = new URLSearchParams(window.location.search).get("code");
			if (!code) return setError("登入回傳資料不完整，請重新登入。");
			const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
			if (exchangeError) return setError("登入驗證失敗，請重新登入。");
			const next = sessionStorage.getItem("auth_next") || "/reports";
			sessionStorage.removeItem("auth_next");
			if (data.session) {
				if ((await fetch("/api/admin/access", { headers: { Authorization: `Bearer ${data.session.access_token}` } })).ok) return window.location.replace("/admin");
			}
			window.location.replace(next.startsWith("/") ? next : "/reports");
		})();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "auth-loading",
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "auth-error",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			href: "/login",
			className: "auth-retry",
			children: "返回登入"
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "auth-spinner",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 20 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Google 登入成功，正在確認帳號權限…" })] })
	});
}
//#endregion
export { AuthCallbackPage as default };
