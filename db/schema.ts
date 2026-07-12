import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
