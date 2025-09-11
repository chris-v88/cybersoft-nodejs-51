import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules-api/article/article.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';
import { ConfigModule } from './modules-system/config/config.module'; // Import ConfigModule để quản lý các biến môi trường
import { AuthModule } from './modules/modules-api/auth/auth.module';

@Module({
  // gắn config module vào đây trong import
  imports: [
    ConfigModule, // Thêm ConfigModule vào đây để toàn bộ app có thể sử dụng các biến môi trường
    ArticleModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
