import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import Link from "./link-C7AACWvc.js";
import { t as createLucideIcon } from "./createLucideIcon-Nus6JIEk.js";
import { t as supabase } from "./supabase-B1rkkxKM.js";
//#region node_modules/lucide-react/dist/esm/icons/check.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("Check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
//#endregion
//#region app/auth/callback/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function AuthCallbackPage() {
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		(async () => {
			const code = new URLSearchParams(window.location.search).get("code");
			if (!code) return setError("登入回傳資料不完整，請重新登入。");
			const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
			if (exchangeError) return setError("登入驗證失敗，請重新登入。");
			const next = sessionStorage.getItem("auth_next") || "/reports";
			sessionStorage.removeItem("auth_next");
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Google 登入成功，正在開啟會員專區…" })] })
	});
}
//#endregion
export { AuthCallbackPage as default };
