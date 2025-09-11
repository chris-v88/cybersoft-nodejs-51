import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';

export class LoginDto {
  constructor(private readonly prisma: PrismaService) {}

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
