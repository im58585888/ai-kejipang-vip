import { T as __toESM, b as require_react, t as require_jsx_runtime } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CM9QDcEr.js";
import { t as supabase } from "./supabase-BbqHW971.js";
import Image from "./image-CfFYFD1s.js";
import { t as CreditCard } from "./credit-card-BNfKx_l0.js";
//#region node_modules/lucide-react/dist/esm/icons/log-out.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogOut = createLucideIcon("LogOut", [
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}],
	["polyline", {
		points: "16 17 21 12 16 7",
		key: "1gabdz"
	}],
	["line", {
		x1: "21",
		x2: "9",
		y1: "12",
		y2: "12",
		key: "1uyos4"
	}]
]);
//#endregion
//#region components/member-account.tsx
var import_jsx_runtime = require_jsx_runtime();
function MemberAccount() {
	const [user, setUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => setUser(data.user));
	}, []);
	const avatar = user?.user_metadata?.avatar_url;
	const name = user?.user_metadata?.full_name || user?.email || "VIP 會員";
	async function signOut() {
		await supabase.auth.signOut();
		window.location.assign("/");
	}
	async function manageSubscription() {
		const { data } = await supabase.auth.getSession();
		if (!data.session) return;
		const result = await (await fetch("/api/stripe/portal", {
			method: "POST",
			headers: { Authorization: `Bearer ${data.session.access_token}` }
		})).json();
		if (result.url) window.location.assign(result.url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "member-account",
		children: [
			avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
				src: avatar,
				alt: "",
				width: 42,
				height: 42,
				className: "member-avatar",
				unoptimized: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "member-avatar-fallback",
				children: "VIP"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: user?.email ?? "會員帳戶" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: manageSubscription,
				"aria-label": "管理訂閱",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "訂閱" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: signOut,
				"aria-label": "登出",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "登出" })]
			})
		]
	});
}
//#endregion
export { MemberAccount };
