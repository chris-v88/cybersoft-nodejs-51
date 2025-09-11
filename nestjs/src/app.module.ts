import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/modules-api/article/article.module';
import { PrismaModule } from './modules/modules-system/prisma/prisma.module';
import { ConfigModule } from './modules/modules-system/config/config.module'; // Import ConfigModule để quản lý các biến môi trường
import { AuthModule } from './modules/modules-api/auth/auth.module';
import { TokenModule } from './modules/modules-system/token/token.module';

@Module({
  // gắn config module vào đây trong import
  imports: [
    ConfigModule, // Thêm ConfigModule vào đây để toàn bộ app có thể sử dụng các biến môi trường
    ArticleModule,
    PrismaModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
