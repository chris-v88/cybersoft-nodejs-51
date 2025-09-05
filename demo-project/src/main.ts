import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './comoon/constant/app.constant';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api'); // Set global prefix for all routes

  const logger = new Logger("Bootstrap");
  
  await app.listen(PORT ?? 3000, () =>{
    logger.log(`Server is running on http://localhost:${PORT ?? 3000}`);
  });
}

bootstrap();
