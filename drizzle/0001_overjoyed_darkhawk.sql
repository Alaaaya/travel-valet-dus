CREATE TABLE `pricing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceType` varchar(50) NOT NULL,
	`pricePerDay` int NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pricing_id` PRIMARY KEY(`id`),
	CONSTRAINT `pricing_serviceType_unique` UNIQUE(`serviceType`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`emoji` varchar(10),
	`description` text,
	`price` int,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
