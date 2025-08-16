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
 * sequelize: ORM để tương tác với DB, hỗ trợ nhiều loại DB khác nhau
 *            - npx sequelize init: khởi tạo 1 lần
 *            - npx sequelize db:migrate: chạy các migration để tạo bảng trong DB
 *            - npx sequelize db:seed: chèn dữ liệu mẫu vào DB
 *
 * sequelize-auto: để tự động sinh ra các model từ DB hiện tại
 *                - npx sequelize-auto -o "./src/models" -d database_name -h localhost -u username -p 3306 -x password --dialect mysql
 *
 * cors: cho phép FE nào sử dụng (API) lấy dữ liệu từ BE
 *      - middleware để xử lý CORS (Cross-Origin Resource Sharing)
 *      - app.use(cors());
 *
 * bcrypt: mã hoá mật khẩu (bắt buộc phải sử dụng khi lưu mật khẩu)
 * 
 * jsonwebtoken: tạo và xác thực token (JWT)
 * 
 * passport-google-oauth20: chiến lược (logic) cho flow đăng nhập bằng google
 * 
 * passport: thư viện cha sẽ luôn cần cài nếu muốn sử dụng passport-google-oauth20
 */
