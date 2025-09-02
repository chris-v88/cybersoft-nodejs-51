import jwt from 'jsonwebtoken';
import { responseError } from '../helpers/response.helpers';
import { statusCodes } from '../helpers/status-code.helper';

/**
 * Error handling middleware for the application.
 * @param {*} err - The error object.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 */
export const appError = (err, req, res, next) => {
  console.log('middleware appError executed');

  // 401 - logout
  // 403 - api refresh-token
  if (err instanceof jwt.JsonWebTokenError) err.code = statusCodes.UNAUTHORIZED;
  if (err instanceof jwt.TokenExpiredError) err.code = statusCodes.FORBIDDEN;

  const resData = responseError(err, err?.message, err?.code);
  res.status(resData.statusCode).json(resData);
};
