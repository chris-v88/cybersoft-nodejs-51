import { responseError } from '../helpers/response.helpers';

/**
 * Error handling middleware for the application.
 * @param {*} err - The error object.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 */
export const appError = (err, req, res, next) => {
  console.log('middleware appError executed');

  const resData = responseError(err, err?.message, err?.code);
  res.status(resData.statusCode).json(resData);
};
