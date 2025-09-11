import { Injectable } from '@nestjs/common'; // Import decorator Injectable từ NestJS để đánh dấu class này là service có thể inject (tiêm vào).
import { ConfigService as NestConfigService } from '@nestjs/config'; // Import ConfigService gốc của NestJS, đổi tên để tránh trùng với class này.

@Injectable() // Đánh dấu class này là service, có thể inject vào constructor của class khác.
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {} // Inject NestJS ConfigService vào để sử dụng.

  get(key: string): string {
    // Hàm lấy giá trị biến môi trường theo key (tên biến).
    const value = this.configService.get<string>(key); // Gọi hàm get của NestJS ConfigService để lấy giá trị.
    if (!value) {
      throw new Error(`Biến môi trường '${key}' không tồn tại hoặc rỗng`); // Ném lỗi nếu biến không tồn tại
    }
    return value; // Trả về giá trị nếu hợp lệ
  }

  getDatabaseUrl(): string {
    // Hàm chuyên dụng để lấy URL database.
    return this.get('DATABASE_URL'); // Gọi hàm get với key 'DATABASE_URL'.
  }

  getAccessTokenSecret(): string {
    // Hàm lấy secret key để tạo access token.
    return this.get('ACCESS_TOKEN_SECRET');
  }

  getAccessTokenExpiresIn(): string {
    // Hàm lấy thời gian hết hạn của access token.
    return this.get('ACCESS_TOKEN_EXPIRES_IN');
  }

  getRefreshTokenSecret(): string {
    // Hàm lấy secret key để tạo refresh token.
    return this.get('ACCESS_REFRESH_SECRET');
  }

  getRefreshTokenExpiresIn(): string {
    // Hàm lấy thời gian hết hạn của refresh token.
    return this.get('ACCESS_REFRESH_EXPIRES_IN');
  }

  getGoogleClientId(): string {
    // Hàm lấy Google Client ID cho OAuth.
    return this.get('GOOGLE_CLIENT_ID');
  }

  getGoogleClientSecret(): string {
    // Hàm lấy Google Client Secret cho OAuth.
    return this.get('GOOGLE_CLIENT_SECRET');
  }

  getPort(): number {
    // Hàm lấy port để chạy server.
    const port = this.configService.get<string>('PORT'); // Lấy PORT từ biến môi trường
    return Number(port) || 3000; // Chuyển string thành number, nếu không có thì mặc định là 3000.
  }

  // Thêm các getter khác tùy theo nhu cầu dự án...
}
