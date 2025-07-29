import express from 'express';

const app = express();
// express.json(); // Middleware to parse JSON bodies

// giúp body nhận dc dữ liệu từ client gửi lên
app.use(express.json()); // Placeholder for middleware

/**
 * Middleware to parse JSON bodies.
 * This allows the server to handle JSON data sent in requests.
 * @param {string} path - The path to the JSON body parser
 * @param {Function} callback - The callback function to execute when the middleware is applied
 */

// resquest: The request object containing information about the HTTP request
// response: The response object used to send a response back to the client
// next: The next middleware function in the stack
app.get('/login', (request, response, next) => {
  response.json('hello world');
});

// ví dụ trong postman:
// GET http://localhost:3069/query?email=tu@email.com&name=tu
/**
 * Nhận dữ liệu ở quẻy
 * - nhận biết: sau dáu ? và mỗi tham số cách nhau bằng dấu &
 * - thường dùng cho: phân trang, lọc dữ liệu, tìm kiếm
 * - tránh: thiế kế nhận qua body vì FE (axios) chặn gủiw body với GET
 */
app.get('/query', (request, response, next) => {
  const query = request.query;

  response.json({
    message: 'Query received',
    query: query,
  });
});

/**
 * Path parameters
 * - Nhận biết: được xác định bằng dấu hai chấm : trong url
 * - thường dùng: (lấy, xoá, cập nhật) một phần tử cụ thể thông qua id
 * - id : nếu là số, sẽ là chuỗi số (sẽ luôn luôn là CHUỖI)
 */
app.put('/path/:id', (request, response, next) => {
  const param = request.params;

  console.log('Path parameter:', param);

  // Thực hiện cập nhật dữ liệu
  response.json({
    message: 'Data updated successfully',
    data: null,
  });
});

/**
 * Headers
 * Thường dùng: xác thực token (authentization), meta dât, x-api-key
 *
 */
app.delete('/delete', (request, response, next) => {
  const headers = request.headers;

  console.log('Headers:', headers);

  // Thực hiện xóa dữ liệu
  response.json({
    message: 'Data deleted successfully',
    data: headers,
  });
});

/**
 * Body
 */
app.post('/body', (request, response, next) => {
  const body = request.body;

  response.json({
    message: 'Body received',
    body: body,
  });
});

const port = 3069;
/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - Optional callback function to execute when the server starts.
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
