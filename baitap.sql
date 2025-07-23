-- Học Viên: Võ Hoàng Việt Tú
-- Lớp: NodeJS 51

CREATE DATABASE IF NOT EXISTS baitap;

USE baitap;

-- Tạo các Table
CREATE TABLE `user` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `full_name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255),
);

CREATE TABLE

CREATE TABLE `food` (
  `food_id` INT PRIMARY KEY AUTO_INCREMENT,
  `food_name` VARCHAR(255),
  `image` VARCHAR(255),
  `price` FLOAT,
  `desc` VARCHAR(255),
);
