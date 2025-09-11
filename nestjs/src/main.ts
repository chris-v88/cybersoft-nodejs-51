import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './modules/modules-system/config/config.service'; // Import ConfigService để lấy port từ .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Đặt tiền tố 'api' cho tất cả các route (đường dẫn)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  ); // Bật kiểm tra dữ liệu (validation) cho toàn bộ ứng dụng

  // Tạo logger để in thông tin khi server chạy
  const logger = new Logger('Bootstrap');

  // Lấy ConfigService từ app
  const configService = app.get(ConfigService);
  const port = configService.getPort(); // Lấy port từ biến môi trường

  await app.listen(port, () => {
    logger.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap();
