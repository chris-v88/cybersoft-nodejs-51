import express from 'express';
import demoController from '../controllers/demo.controller';

const demoRouter = express.Router();

/**
 * Middleware to parse JSON bodies.
 * This allows the server to handle JSON data sent in requests.
 * @param {string} path - The path to the JSON body parser
 * @param {Function} callback - The callback function to execute when the middleware is routerlied
 */

// resquest: The request object containing information about the HTTP request
// response: The response object used to send a response back to the client
// next: The next middleware function in the stack
demoRouter.get('/check-server', demoController.service);

// ví dụ trong postman:
// GET http://localhost:3069/query?email=tu@email.com&name=tu
/**
 * Nhận dữ liệu ở quẻy
 * - nhận biết: sau dáu ? và mỗi tham số cách nhau bằng dấu &
 * - thường dùng cho: phân trang, lọc dữ liệu, tìm kiếm
 * - tránh: thiế kế nhận qua body vì FE (axios) chặn gủiw body với GET
 */
demoRouter.get('/query', demoController.query);

/**
 * Path parameters
 * - Nhận biết: được xác định bằng dấu hai chấm : trong url
 * - thường dùng: (lấy, xoá, cập nhật) một phần tử cụ thể thông qua id
 * - id : nếu là số, sẽ là chuỗi số (sẽ luôn luôn là CHUỖI)
 */
demoRouter.put('/path/:id', demoController.path);

/**
 * Headers
 * Thường dùng: xác thực token (authentization), meta dât, x-api-key
 *
 */
demoRouter.delete('/delete', demoController.delete);

/**
 * Body
 */
demoRouter.post('/body', demoController.body);

export default demoRouter;
