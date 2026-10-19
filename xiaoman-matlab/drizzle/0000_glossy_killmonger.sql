CREATE TABLE `answers` (
	`learner_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`section_index` integer NOT NULL,
	`attempts` integer NOT NULL,
	`correct` integer NOT NULL,
	`last_answer` integer NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`learner_id`, `lesson_id`, `section_index`),
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `learners` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_hash` text NOT NULL,
	`viewer_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learners_learner_hash_unique` ON `learners` (`learner_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `learners_viewer_hash_unique` ON `learners` (`viewer_hash`);--> statement-breakpoint
CREATE TABLE `practices` (
	`learner_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`checked` integer NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`learner_id`, `lesson_id`),
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action
);
