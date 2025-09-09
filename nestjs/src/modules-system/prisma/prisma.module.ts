import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  //   controllers: [],
  providers: [PrismaService],
  // imports: [],
  exports: [PrismaService], // Thêm exports để các module khác có thể sử dụng PrismaService
})
export class PrismaModule {}
