import { BadResquestException, UnauthorizedException } from "../helpers/exception.helper";

export const protect = (req, res, next) => {
  const authorization = req.headers.authorization;

  // 401 : log out người dùng
  if (!authorization) throw new UnauthorizedException('Not authorized');

  // authorization.split(' ')[1];
  // tách chuỗi Bearer <token>
  const [type, accessToken] = authorization.split(' ');

  if (type !== 'Bearer') throw new UnauthorizedException('Invalid token type');
  if (!accessToken) throw new UnauthorizedException('Token not found');

  console.log('Protect middleware', {authorization, type, accessToken});

  next();
}