CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`serviceType` varchar(50) NOT NULL,
	`serviceName` varchar(100) NOT NULL,
	`priceInCents` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EUR',
	`customerEmail` varchar(320) NOT NULL,
	`customerName` varchar(100),
	`stripePaymentIntentId` varchar(255),
	`stripeSessionId` varchar(255),
	`status` enum('pending','completed','failed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
