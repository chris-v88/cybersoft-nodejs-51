import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules-api/article/article.module';

@Module({
  // gắn config module vào đây trong import 
  imports: [ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
