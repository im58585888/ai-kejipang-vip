import { T as __toESM, b as require_react, c as usePathname } from "../index.js";
//#region components/analytics-tracker.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function visitorId() {
	const key = "ai-kejipang-visitor";
	let value = localStorage.getItem(key);
	if (!value) {
		value = crypto.randomUUID();
		localStorage.setItem(key, value);
	}
	return value;
}
function AnalyticsTracker() {
	const pathname = usePathname();
	(0, import_react.useEffect)(() => {
		if (pathname.startsWith("/admin")) return;
		const body = JSON.stringify({
			eventType: "page_view",
			path: pathname,
			visitorId: visitorId()
		});
		if (navigator.sendBeacon) navigator.sendBeacon("/api/analytics/track", new Blob([body], { type: "application/json" }));
		else fetch("/api/analytics/track", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
			keepalive: true
		});
	}, [pathname]);
	return null;
}
//#endregion
export { AnalyticsTracker };
