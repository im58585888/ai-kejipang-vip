import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const analyticsEvents = sqliteTable("analytics_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventType: text("event_type").notNull(),
  path: text("path").notNull(),
  reportId: text("report_id"),
  userId: text("user_id"),
  visitorId: text("visitor_id"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("analytics_events_created_idx").on(table.createdAt),
  index("analytics_events_type_idx").on(table.eventType),
  index("analytics_events_path_idx").on(table.path),
]);

export const memberReports = sqliteTable("member_reports", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  reportNo: text("report_no").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  publishedAt: text("published_at").notNull(),
  readMinutes: integer("read_minutes").notNull().default(10),
  tags: text("tags").notNull().default("[]"),
  markdown: text("markdown").notNull(),
  pdfKey: text("pdf_key"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("published"),
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  uniqueIndex("member_reports_slug_idx").on(table.slug),
  index("member_reports_published_idx").on(table.publishedAt),
  index("member_reports_status_idx").on(table.status),
]);
