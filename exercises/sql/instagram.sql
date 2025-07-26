-- INSTAGRAM MOCK --
-- test run bigger app
CREATE DATABASE IF NOT EXISTS `mock-instagram-db`;

USE `mock-instagram-db`;

CREATE TABLE `Users` (
	`user_id` INT PRIMARY KEY AUTO_INCREMENT,
	`username` VARCHAR(25) NOT NULL UNIQUE,
	`email` VARCHAR(25) NOT NULL UNIQUE,
	`full_name` VARCHAR(255),
	`bio` VARCHAR(300),
	`created_at` DATETIME
);

CREATE TABLE `Posts` (
	`post_id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT,
	`image_url` VARCHAR(255),
	`caption` VARCHAR(255),
	`created_at` DATETIME,
	
	FOREIGN KEY (`user_id`) 
);

CREATE TABLE `Comments` (
	`comment_id` INT PRIMARY KEY AUTO_INCREMENT,
	`post_id` INT,
	`user_id` INT,
	`text` VARCHAR(255),
	`created_at` DATETIME,
);

CREATE TABLE `Follows` (
	`follower_id` INT,
	`followee_id` INT,
	`created_at` INT,
);
