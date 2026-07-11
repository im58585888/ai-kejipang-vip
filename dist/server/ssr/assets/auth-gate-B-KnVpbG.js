import { c as usePathname, l as useRouter, t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { t as supabase } from "./supabase-B1rkkxKM.js";
//#region components/auth-gate.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AuthGate({ children }) {
	const router = useRouter();
	const pathname = usePathname();
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			if (!data.session) return router.replace(`/login?next=${encodeURIComponent(pathname)}`);
			setReady(true);
		});
		const { data } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
		});
		return () => {
			mounted = false;
			data.subscription.unsubscribe();
		};
	}, [pathname, router]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "auth-loading",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "auth-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "正在確認會員身份…" })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { AuthGate };
