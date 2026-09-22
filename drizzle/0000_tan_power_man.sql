CREATE TABLE `posts` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`status` text NOT NULL,
	`published_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`content_hash` text NOT NULL,
	`revision` text NOT NULL,
	`payload` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_posts_status_published` ON `posts` (`status`,`published_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_posts_content_hash` ON `posts` (`content_hash`);