// @ts-nocheck
import { afterEach, beforeEach, describe, it, jest } from '@jest/globals';
import { authService } from '../../services/auth.service';
import prisma from '../prisma/init.prisma';

describe('Register', () => {
  beforeEach(() => {
    jest.spyOn(prisma.users, 'findUnique');
    jest.spyOn(prisma.users, 'create');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Case 1: đăng ký với thông tin hợp lệ', async () => {
    const data = {
      id: 13,
      email: 'test@example.com',
      fullName: 'Test User',
      avatar: null,
      facebookId: null,
      googleId: null,
      roleId: 2,
      deletedBy: 0,
      isDeleted: false,
      deletedAt: null,
      createdAt: '2025-08-25T00:29:34.000Z',
      updatedAt: '2025-08-25T00:29:34.000Z',
    };
    prisma.users.findUnique.mockResolvedValue(null);
    prisma.users.create.mockResolvedValue({
      ...data,
      password: '$2b$10$XOZ4FecRQF1avpHG5R8CH.XeoDxA1fvPKDZDfaRHmUg9Ze0LnDe1C',
    });

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
      },
    };

    const result = await authService.register(req);

    expect(result).not.toHaveProperty('password');
  });

  it('Case 2: đăng ký với email đã tồn tại', () => {
    console.log('case 2 chạy');
  });
});
