import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import Link from "./link-C7AACWvc.js";
import { t as createLucideIcon } from "./createLucideIcon-Nus6JIEk.js";
import { t as supabase } from "./supabase-B1rkkxKM.js";
import Image from "./image-JnJlK3YQ.js";
//#region node_modules/lucide-react/dist/esm/icons/arrow-left.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeft = createLucideIcon("ArrowLeft", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/arrow-right.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("ArrowRight", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/shield-check.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("ShieldCheck", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
//#endregion
//#region app/login/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) window.location.replace("/reports");
		});
	}, []);
	async function signInWithGoogle() {
		setLoading(true);
		setError("");
		const next = new URLSearchParams(window.location.search).get("next") || "/reports";
		sessionStorage.setItem("auth_next", next.startsWith("/") ? next : "/reports");
		const { error: signInError } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/auth/callback` }
		});
		if (signInError) {
			setError("目前無法連接 Google，請稍後再試。");
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "login-brand-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					href: "/",
					className: "login-back",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 17 }), " 返回首頁"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-brand-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI 科技胖 VIP" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"研究不必",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"從零開始。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "一次登入，解鎖所有歷史報告與每週最新研究。" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-signal",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "login-form-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "login-form",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
						src: "/brand/ai-kejipang-logo-mark.png",
						alt: "AI 科技胖",
						width: 64,
						height: 64,
						className: "login-logo",
						unoptimized: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-label",
						children: "會員登入"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "歡迎回來" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "使用 Google 帳號登入；第一次登入時會自動建立會員帳戶。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "google-login-button",
						onClick: signInWithGoogle,
						disabled: loading,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "google-g",
								children: "G"
							}),
							loading ? "正在連接 Google…" : "使用 Google 帳號繼續",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "auth-error",
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }), " 登入由 Google 與 Supabase 安全處理；本站不會取得你的 Google 密碼。"] })
				]
			})
		})]
	});
}
//#endregion
export { LoginPage as default };
