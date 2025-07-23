-- Học Viên: Võ Hoàng Việt Tú
-- Lớp: NodeJS 51
-- Bài tập về nhà Buổi 4

CREATE DATABASE IF NOT EXISTS baitap;

USE baitap;

-- Tạo các Table Chính
CREATE TABLE `user` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `full_name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255)
);

CREATE TABLE `food_type` (
	`type_id` INT PRIMARY KEY AUTO_INCREMENT,
	`type_name` VARCHAR(255)
);

CREATE TABLE `restaurant` (
	`res_id` INT PRIMARY KEY AUTO_INCREMENT,
	`res_name` VARCHAR(255),
	`image` VARCHAR(255),
	`desc` VARCHAR(255)
);

-- Tạo các table mối quan hệ 1:many
-- Một loại đồ ăn (food_type) có thể nhiều món ăn (food)
CREATE TABLE `food` (
  `food_id` INT PRIMARY KEY AUTO_INCREMENT,
  `food_name` VARCHAR(255),
  `image` VARCHAR(255),
  `price` FLOAT,
  `desc` VARCHAR(255),
  `type_id` INT,
  
  FOREIGN KEY (`type_id`) REFERENCES `food_type`(`type_id`)
);

-- Một món ăn (food) có thể nhiều món đồ ăn phụ (sub food)
CREATE TABLE `sub_food` (
	`sub_id` INT PRIMARY KEY AUTO_INCREMENT,
	`sub_name` VARCHAR(255),
	`sub_price` FLOAT,
	`food_id` INT,
	
	FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`)
);

-- Tạo các table cho mối quan hệ many:many
CREATE TABLE `order` (
	`order_id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT,
	`food_id` INT,
	`food_amount` INT,
	`code` VARCHAR(255),
	`arr_sub_id` VARCHAR(255),
	
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`)
);

CREATE TABLE `rate_res` (
	`rating_id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT,
	`res_id` INT,
	`amount` INT,
	`date_rate` DATETIME,
	
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`)
);

CREATE TABLE `like_res` (
	`like_id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT,
	`res_id` INT,
	`date_like` DATETIME,
	
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`)
);