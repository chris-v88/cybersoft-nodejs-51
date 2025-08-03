/**
 * extensionless: để giúp import không cần thêm đuôi js
 *
 * nodemon: để load lại server khi có code thay đổi
 *
 * mysql2: để tương tác với db (không phải là ORM)
 *         là thư viện hỗ trợ kết nối với MySQL, MariaDB
 *         và các cơ sở dữ liệu tương thích với MySQL.
 *         Nó cung cấp các phương thức để thực hiện các truy vấn SQL,
 *         quản lý kết nối và xử lý dữ liệu trả về từ cơ sở dữ liệu.
 *
 * prisma: ORM để tương tác với DB, khuyên dùng vì đơn giản và hiệu quả
 *        - npx prisma init: khởi tạo 1 lần
 *        - npx prisma db pull : kéo cấu trúc DB hiện tại về schema.prisma
 *        - npx prisma generate: sinh ra các model tương ứng với schema.prisma
 *
 * dotenv: để đọc biến môi trường từ file .env vào process.env
 *
 */
