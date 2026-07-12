import { T as __toESM, b as require_react, t as require_jsx_runtime } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CM9QDcEr.js";
import { t as supabase } from "./supabase-BbqHW971.js";
//#region node_modules/lucide-react/dist/esm/icons/arrow-up-right.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUpRight = createLucideIcon("ArrowUpRight", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/download.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("Download", [
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["polyline", {
		points: "7 10 12 15 17 10",
		key: "2ggqvy"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "15",
		y2: "3",
		key: "1vk2je"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/file-text.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileText = createLucideIcon("FileText", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/refresh-cw.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RefreshCw = createLucideIcon("RefreshCw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/users.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Users = createLucideIcon("Users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["path", {
		d: "M16 3.13a4 4 0 0 1 0 7.75",
		key: "1da9ce"
	}]
]);
//#endregion
//#region components/admin-dashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
var statusText = {
	active: "有效",
	trialing: "試用",
	past_due: "付款逾期",
	canceled: "已取消",
	incomplete: "未完成",
	unpaid: "未付款"
};
function AdminDashboard() {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function load() {
		setLoading(true);
		setError("");
		const { data: auth } = await supabase.auth.getSession();
		if (!auth.session) {
			window.location.replace("/login?next=/admin");
			return;
		}
		const response = await fetch("/api/admin/overview", { headers: { Authorization: `Bearer ${auth.session.access_token}` } });
		if (response.status === 403) {
			setError("這個帳號沒有管理員權限。");
			setLoading(false);
			return;
		}
		if (!response.ok) {
			setError("目前無法載入營運資料，請稍後再試。");
			setLoading(false);
			return;
		}
		setData(await response.json());
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "auth-loading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "auth-spinner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "正在載入真實營運資料…" })]
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "auth-loading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "auth-error",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			className: "auth-retry",
			children: "返回首頁"
		})]
	});
	const maxViews = Math.max(...data.daily.map((item) => item.views), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "admin-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "admin-sidebar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-brand",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						"AI 科技胖 ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "VIP" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "active",
						children: "營運總覽"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#members",
						children: "會員管理"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#traffic",
						children: "流量分析"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#downloads",
						children: "下載紀錄"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-user",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "胖" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "網站管理員" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Stripe 正式資料" })] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "admin-workspace",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "admin-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "營運總覽" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["更新時間 ", new Date(data.generatedAt).toLocaleString("zh-TW")] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "admin-refresh",
						onClick: load,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 17 }), "重新整理"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-metrics",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "有效付費會員" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.metrics.activeMembers.toLocaleString() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "up",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 }), " Stripe 即時狀態"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "每月經常性收入" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["US$", data.metrics.mrr.toFixed(2)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "依有效訂閱換算" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "downloads",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "報告下載" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.metrics.downloads.toLocaleString() }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "自追蹤上線起" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "近 30 日取消" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.metrics.canceled30d }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Stripe 已取消訂閱" })
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "admin-chart-section",
					id: "traffic",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chart-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "網站流量" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "最近 14 天頁面瀏覽；自追蹤上線起累積" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							data.metrics.visitors.toLocaleString(),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "不重複訪客" })
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar-chart",
						children: data.daily.length ? data.daily.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							style: { height: `${Math.max(5, Math.round(item.views / maxViews * 130))}px` },
							title: `${item.views} 次瀏覽`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.day.slice(5) })] }, item.day)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "admin-empty",
							children: "等待第一批流量資料"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-bottom",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-section-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "熱門頁面" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [data.metrics.views, " 次瀏覽"] })]
					}), data.popular.length ? data.popular.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "popular-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.path }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "真實頁面瀏覽" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.views })
						]
					}, item.path)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "admin-empty",
						children: "尚無頁面瀏覽資料"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "admin-section-title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "營運狀態" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "activity-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [data.metrics.activeMembers, " 位有效會員"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "来自 Stripe 正式訂閱" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "activity-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [data.metrics.views, " 次頁面瀏覽"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "自本功能上線後開始計算" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "activity-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [data.metrics.downloads, " 次報告下載"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "透過網站下載連結追蹤" })] })]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "admin-members",
					id: "members",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-section-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "付費會員管理" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "来自 Stripe；尚未付款的 Google 註冊者不包含在此表" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [data.members.length, " 筆訂閱"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-member-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-member-row admin-member-head",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "會員" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "狀態" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "本期結束" })
							]
						}), data.members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-member-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: member.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: member.email })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `status-dot status-${member.status}` }), member.cancelAtPeriodEnd ? "已排程取消" : statusText[member.status] || member.status] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: member.periodEnd ? (/* @__PURE__ */ new Date(member.periodEnd * 1e3)).toLocaleDateString("zh-TW") : "—" })
							]
						}, member.id))]
					})]
				})
			]
		})]
	});
}
//#endregion
export { AdminDashboard };
