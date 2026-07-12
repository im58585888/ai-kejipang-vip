import { T as __toESM, b as require_react, l as useRouter, t as require_jsx_runtime, u as useSearchParams } from "../index.js";
import { t as Check } from "./check-Cuh-VUwe.js";
import { t as supabase } from "./supabase-BbqHW971.js";
import { n as ArrowRight, t as ShieldCheck } from "./shield-check-DhSgR02W.js";
import { t as CreditCard } from "./credit-card-BNfKx_l0.js";
//#region components/subscribe-panel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SubscribePanel() {
	const router = useRouter();
	const params = useSearchParams();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(params.get("checkout") === "cancelled" ? "付款尚未完成，你可以隨時重新開始。" : "");
	(0, import_react.useEffect)(() => {
		if (params.get("checkout") !== "success") return;
		let attempts = 0;
		const verify = async () => {
			const { data } = await supabase.auth.getSession();
			if (!data.session) return;
			const response = await fetch("/api/stripe/status", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
			if ((response.ok ? await response.json() : null)?.active) return router.replace("/reports");
			attempts += 1;
			if (attempts < 6) setTimeout(verify, 1200);
			else setMessage("付款已送出，訂閱狀態仍在同步，請稍後重新整理。");
		};
		verify();
	}, [params, router]);
	async function checkout() {
		setLoading(true);
		setMessage("");
		const { data } = await supabase.auth.getSession();
		if (!data.session) return router.replace("/login?next=/subscribe");
		const result = await (await fetch("/api/stripe/checkout", {
			method: "POST",
			headers: { Authorization: `Bearer ${data.session.access_token}` }
		})).json();
		if (result.url) window.location.assign(result.url);
		else {
			setMessage(result.error || "目前無法開啟付款頁面。");
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "subscribe-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "subscribe-price",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "US$" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "9.99" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "／月" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }), " 解鎖所有歷史研究報告"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }), " 每週市場、大戶與技術型態更新"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }), " PDF 下載與會員專屬內容"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }), " 隨時可在會員中心取消"] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: checkout,
				disabled: loading,
				className: "stripe-checkout-button",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 18 }),
					loading ? "正在開啟安全付款…" : "前往安全付款",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })
				]
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "subscribe-message",
				role: "status",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " 付款由 Stripe 安全處理，本站不會儲存你的信用卡資料。"] })
		]
	});
}
//#endregion
export { SubscribePanel };
