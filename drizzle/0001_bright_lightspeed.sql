CREATE TABLE `member_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`report_no` text NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`published_at` text NOT NULL,
	`read_minutes` integer DEFAULT 10 NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`markdown` text NOT NULL,
	`pdf_key` text,
	`featured` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member_reports_slug_idx` ON `member_reports` (`slug`);--> statement-breakpoint
CREATE INDEX `member_reports_published_idx` ON `member_reports` (`published_at`);--> statement-breakpoint
CREATE INDEX `member_reports_status_idx` ON `member_reports` (`status`);