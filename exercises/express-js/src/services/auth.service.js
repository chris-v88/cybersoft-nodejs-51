import prisma from '../common/prisma/init.prisma';
import * as bcrypt from 'bcrypt';

import { BadResquestException } from '../common/helpers/exception.helper';
import { tokenService } from './token.service';

export const authService = {
  create: async (req) => {
    return `created`;
  },
  findAll: async (req) => {
    return `all auths`;
  },
  findOne: async (req) => {
    return `one auth - ${req.params.id}`;
  },
  update: async (req) => {
    return `updated auth - ${req.params.id}`;
  },
  remove: async (req) => {
    return `removed auth - ${req.params.id}`;
  },
  register: async (req) => {
    const { email, password, fullName } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    // console.log('🚀 ~ user:', user);

    if (user) {
      throw new BadResquestException(
        "User already exists. Can't register another one"
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: passwordHash,
        fullName,
      },
    });
    // console.log('🚀 ~ newUser:', newUser);

    return newUser;
  },
  
  login: async (req) => {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      }
    })

    if (!user) throw new BadResquestException("User does not exist. Can't login");

    // Nếu code chạy được tới đây => đảm bảo có user
    // user.password
    const isPasswordValid = bcrypt.compareSync(password, user.password); // true | false
    if(!isPasswordValid) throw new BadResquestException("Password is not correct. Can't login");
    
    // nếu code chạy dc tới đây => ng dừng hợp lệ
    // trả lại token
    const tokens = tokenService.createTokens(user.id);
    return tokens;
  },

  getInfo: async (req) => {
    return 'get user info successfully';
  },
};
