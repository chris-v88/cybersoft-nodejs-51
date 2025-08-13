import { tokenService } from "../../services/token.service";
import { UnauthorizedException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";

export const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;

  // 401 : log out người dùng
  if (!authorization) throw new UnauthorizedException('Not authorized');

  // authorization.split(' ')[1];
  // tách chuỗi Bearer <token>
  const [type, accessToken] = authorization.split(' ');

  if (type !== 'Bearer') throw new UnauthorizedException('Invalid token type');
  if (!accessToken) throw new UnauthorizedException('Token not found');

  const { userId } = tokenService.verifyAccessToken(accessToken);
  // if (!decodedToken) throw new UnauthorizedException('Invalid token');

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    }
  })


  console.log('Protect middleware', {authorization, type, accessToken, userId, user });

  next();
}