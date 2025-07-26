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



-- Thêm thông tin dữ liệu vào các bảng table

-- Thêm 20 user
INSERT INTO `user` (`full_name`, `email`, `password`)
VALUES
('Nguyễn Văn A', 'nguyenvana1@gmail.com', 'matkhau1'),
('Trần Thị B', 'tranthib2@gmail.com', 'matkhau2'),
('Lê Văn C', 'levanc3@gmail.com', 'matkhau3'),
('Phạm Thị D', 'phamthid4@gmail.com', 'matkhau4'),
('Hoàng Văn E', 'hoangvane5@gmail.com', 'matkhau5'),
('Đỗ Thị F', 'dothif6@gmail.com', 'matkhau6'),
('Vũ Văn G', 'vuvang7@gmail.com', 'matkhau7'),
('Bùi Thị H', 'buithih8@gmail.com', 'matkhau8'),
('Đặng Văn I', 'dangvani9@gmail.com', 'matkhau9'),
('Ngô Thị K', 'ngothik10@gmail.com', 'matkhau10'),
('Phan Văn L', 'phanvanl11@gmail.com', 'matkhau11'),
('Hồ Thị M', 'hothim12@gmail.com', 'matkhau12'),
('Tạ Văn N', 'tavann13@gmail.com', 'matkhau13'),
('Lý Thị O', 'lythio14@gmail.com', 'matkhau14'),
('Trịnh Văn P', 'trinhvanp15@gmail.com', 'matkhau15'),
('Mai Thị Q', 'maithiq16@gmail.com', 'matkhau16'),
('Châu Văn R', 'chauvanr17@gmail.com', 'matkhau17'),
('Kiều Thị S', 'kieuthis18@gmail.com', 'matkhau18'),
('Tống Văn T', 'tongvant19@gmail.com', 'matkhau19'),
('Vương Thị U', 'vuongthiu20@gmail.com', 'matkhau20');

-- Thêm 5 loại món ăn
INSERT INTO `food_type` (`type_name`) 
VALUES
('Món chính'),
('Món phụ'),
('Đồ uống'),
('Tráng miệng'),
('Ăn vặt');

-- Thêm 10 nhà hàng
INSERT INTO `restaurant` (`res_name`, `image`, `desc`) 
VALUES
('Nhà hàng Sông Hồng', 'songhong.jpg', 'Nhà hàng ven sông, không gian thoáng mát'),
('Quán Ăn Gia Đình', 'giadinh.jpg', 'Chuyên các món ăn gia đình Việt Nam'),
('Ẩm Thực Phố Cổ', 'phoco.jpg', 'Ẩm thực truyền thống giữa lòng phố cổ'),
('Nhà Hàng Hải Sản Biển Đông', 'biendong.jpg', 'Hải sản tươi sống, giá hợp lý'),
('Nhà Hàng Chay An Lạc', 'anlac.jpg', 'Món chay thanh tịnh, không gian yên tĩnh'),
('Nhà Hàng BBQ Nướng', 'bbqnuong.jpg', 'Chuyên các món nướng BBQ Hàn Quốc'),
('Nhà Hàng Nhật Sakura', 'sakura.jpg', 'Ẩm thực Nhật Bản chính hiệu'),
('Nhà Hàng Pháp Paris', 'paris.jpg', 'Không gian sang trọng, món Pháp tinh tế'),
('Nhà Hàng Ý Roma', 'roma.jpg', 'Pizza, pasta và các món Ý đặc sắc'),
('Nhà Hàng Lẩu Thái', 'lauthai.jpg', 'Lẩu Thái chua cay, hấp dẫn');

-- Thêm 15 món ăn (food), mỗi món thuộc 1 loại ngẫu nhiên
INSERT INTO `food` (`food_name`, `image`, `price`, `desc`, `type_id`) 
VALUES
('Phở bò', 'phobo.jpg', 45000, 'Phở bò truyền thống Hà Nội', 1),
('Bún chả', 'buncha.jpg', 40000, 'Bún chả thơm ngon', 1),
('Cơm tấm', 'comtam.jpg', 35000, 'Cơm tấm sườn bì chả', 1),
('Gỏi cuốn', 'goicuon.jpg', 25000, 'Gỏi cuốn tôm thịt', 2),
('Nem rán', 'nemran.jpg', 30000, 'Nem rán giòn tan', 2),
('Trà đá', 'trada.jpg', 5000, 'Trà đá mát lạnh', 3),
('Nước mía', 'nuocmia.jpg', 10000, 'Nước mía ngọt mát', 3),
('Chè đậu xanh', 'chedauxanh.jpg', 20000, 'Chè đậu xanh thơm ngon', 4),
('Bánh flan', 'banhflan.jpg', 18000, 'Bánh flan mềm mịn', 4),
('Khoai tây chiên', 'khoaitaychien.jpg', 15000, 'Khoai tây chiên giòn', 5),
('Bánh tráng trộn', 'banhtrangtron.jpg', 20000, 'Bánh tráng trộn hấp dẫn', 5),
('Bánh mì thịt', 'banhmi.jpg', 25000, 'Bánh mì thịt đặc biệt', 1),
('Sữa đậu nành', 'suadaunanh.jpg', 12000, 'Sữa đậu nành bổ dưỡng', 3),
('Bánh bao', 'banhbao.jpg', 18000, 'Bánh bao nhân thịt', 2),
('Súp cua', 'supcua.jpg', 30000, 'Súp cua thơm ngon', 2);

-- Thêm dữ liệu cho bảng order (chỉ một số user có order)
INSERT INTO `order` (`user_id`, `food_id`, `food_amount`, `code`) 
VALUES
(1, 1, 2, 'OD001'),
(2, 3, 1, 'OD002'),
(3, 5, 3, 'OD003'),
(4, 7, 1, 'OD004'),
(6, 2, 2, 'OD005'),
(7, 10, 1, 'OD006'),
(8, 12, 2, 'OD007'),
(10, 4, 1, 'OD008'),
(12, 6, 1, 'OD009'),
(13, 8, 2, 'OD010');

-- Thêm dữ liệu cho bảng like_res (chỉ một số user có like)
INSERT INTO `like_res` (`user_id`, `res_id`, `date_like`) 
VALUES
(1, 1, '2025-07-01 10:00:00'),
(2, 2, '2025-07-02 11:00:00'),
(3, 3, '2025-07-03 12:00:00'),
(4, 4, '2025-07-04 13:00:00'),
(6, 5, '2025-07-05 14:00:00'),
(7, 6, '2025-07-06 15:00:00'),
(8, 7, '2025-07-07 16:00:00'),
(10, 8, '2025-07-08 17:00:00'),
(12, 9, '2025-07-09 18:00:00'),
(13, 10, '2025-07-10 19:00:00');

-- Thêm dữ liệu cho bảng rate_res (chỉ một số user có đánh giá)
INSERT INTO `rate_res` (`user_id`, `res_id`, `amount`, `date_rate`) 
VALUES
(1, 1, 5, '2025-07-01 10:05:00'),
(2, 2, 4, '2025-07-02 11:10:00'),
(3, 3, 5, '2025-07-03 12:15:00'),
(4, 4, 3, '2025-07-04 13:20:00'),
(6, 5, 4, '2025-07-05 14:25:00'),
(7, 6, 5, '2025-07-06 15:30:00'),
(8, 7, 3, '2025-07-07 16:35:00'),
(10, 8, 4, '2025-07-08 17:40:00'),
(12, 9, 5, '2025-07-09 18:45:00'),
(13, 10, 2, '2025-07-10 19:50:00');

-- Thêm dữ liệu cho bảng sub_food (mỗi food có thể có 1-2 món phụ)
INSERT INTO `sub_food` (`sub_name`, `sub_price`, `food_id`) 
VALUES
('Bánh quẩy', 5000, 1),
('Hành lá', 2000, 1),
('Chả cốm', 7000, 2),
('Ớt ngâm', 1000, 2),
('Trứng ốp la', 8000, 3),
('Dưa leo', 3000, 3),
('Tôm khô', 6000, 4),
('Rau sống', 4000, 4),
('Nước mắm chua ngọt', 2000, 5),
('Bún tươi', 5000, 5),
('Chanh tươi', 2000, 6),
('Đá viên', 1000, 6),
('Tắc', 2000, 7),
('Đậu phộng rang', 3000, 7),
('Nước cốt dừa', 4000, 8),
('Bánh tráng', 2000, 9),
('Sốt mayonnaise', 3000, 10),
('Tương ớt', 2000, 10),
('Trứng cút', 4000, 11),
('Khô bò', 7000, 11),
('Dưa leo', 3000, 12),
('Pate', 5000, 12),
('Thạch lá dứa', 3000, 13),
('Đậu đỏ', 4000, 13),
('Lạp xưởng', 6000, 14),
('Trứng muối', 7000, 14),
('Bánh mì giòn', 3000, 15),
('Ngò rí', 2000, 15);
