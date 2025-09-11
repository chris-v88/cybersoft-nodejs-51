import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { TokenService } from 'src/modules/modules-system/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      throw new BadRequestException("User does not exist. Can't login");

    if (!user.password) {
      throw new BadRequestException(
        "User registered via Google OAuth. Can't login. Đề cập lại mật khẩu mới trong login",
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isPasswordValid: boolean = bcrypt.compareSync(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new BadRequestException("Password is not correct. Can't login");

    const tokens = this.tokenService.createTokens(user.id);

    console.log('🔑 Login : ', { email, password });

    return tokens;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
