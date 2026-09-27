CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text,
	`company` text NOT NULL,
	`contact` text,
	`email` text,
	`package` text NOT NULL,
	`monthly_price` real NOT NULL,
	`activation_fee` real NOT NULL,
	`start_date` text,
	`billing_date` text,
	`status` text DEFAULT 'Pending signature' NOT NULL,
	`onboarding_status` text DEFAULT 'Not sent' NOT NULL,
	`access_status` text DEFAULT 'Missing' NOT NULL,
	`content_cycle_status` text DEFAULT 'Not started',
	`approval_status` text DEFAULT 'Not started',
	`metricool_status` text DEFAULT 'Not connected',
	`reporting_status` text DEFAULT 'Not due',
	`notes` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`cycle` text NOT NULL,
	`number` integer NOT NULL,
	`pillar` text,
	`platform` text,
	`format` text,
	`asset_status` text DEFAULT 'Missing',
	`caption` text,
	`creative_url` text,
	`qa_status` text DEFAULT 'Pending',
	`approval_status` text DEFAULT 'Pending',
	`revision_count` integer DEFAULT 0,
	`stage` text DEFAULT 'Idea' NOT NULL,
	`planned_date` text,
	`scheduled_date` text,
	`published_date` text,
	`metricool_id` text,
	`performance_notes` text,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`entity_id` text,
	`at` text NOT NULL,
	`details` text
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`cycle` text NOT NULL,
	`type` text NOT NULL,
	`base_amount` real NOT NULL,
	`credit` real DEFAULT 0 NOT NULL,
	`amount_due` real NOT NULL,
	`due_date` text,
	`paid_at` text,
	`status` text DEFAULT 'Planned' NOT NULL,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`package_interest` text,
	`contact_preference` text NOT NULL,
	`details` text NOT NULL,
	`source` text,
	`status` text DEFAULT 'Lead' NOT NULL,
	`created_at` text NOT NULL,
	`last_contact` text,
	`next_follow_up` text,
	`agreement_status` text DEFAULT 'Not sent',
	`activation_status` text DEFAULT 'Not due',
	`onboarding_status` text DEFAULT 'Not sent',
	`notes` text
);
