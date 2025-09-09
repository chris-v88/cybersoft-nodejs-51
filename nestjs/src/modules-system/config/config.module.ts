import { Global, Module } from '@nestjs/common'; // Import các decorator Global, Module từ NestJS. Dùng để đánh dấu module này là global và định nghĩa module.
import { ConfigModule as NestConfigModule } from '@nestjs/config'; // Import ConfigModule của NestJS, đổi tên thành NestConfigModule để tránh trùng tên.
import { envValidation } from './env.validation'; // Import hàm kiểm tra (validate) các biến môi trường từ file env.validation.ts
import { ConfigService } from './config.service'; // Import service dùng để lấy giá trị các biến môi trường.

@Global() // Đánh dấu module này là global, các module khác đều có thể sử dụng mà không cần import lại
@Module({
  imports: [
    NestConfigModule.forRoot({
      // Khởi tạo ConfigModule của NestJS
      isGlobal: true, // Đặt là global, toàn bộ app đều dùng được
      envFilePath: '.env', // Đọc các biến môi trường từ file .env
      validate: envValidation, // Kiểm tra tính hợp lệ của các biến môi trường bằng hàm envValidation
    }),
  ],
  providers: [ConfigService], // Đăng ký ConfigService để các nơi khác có thể sử dụng
  exports: [ConfigService], // Xuất ConfigService ra ngoài để các module khác import dùng
})
export class ConfigModule {} // Định nghĩa class ConfigModule, đại diện cho module cấu hình của dự án
