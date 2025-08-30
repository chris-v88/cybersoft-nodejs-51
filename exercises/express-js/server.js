import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import rootRouter from './src/routers/root.router';

import { appError } from './src/common/app-error/app-error.error';
import { responseError } from './src/common/helpers/response.helpers';
import { initGoogleAuth20 } from './src/common/passports/google-auth20.passport';
import { initSocket } from './src/common/socket/initi.socket';

const app = express();
// express.json(); // Middleware to parse JSON bodies

// giúp body nhận dc dữ liệu từ client gửi lên
app.use(express.json()); // Placeholder for middleware

// luôn để cors trước router api
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

// luôn luôn để trước router
initGoogleAuth20();

// router api
app.use('/api', rootRouter);

// xử lý lỗi chung cho toàn bộ ứng dụng
app.use(appError);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-undef
  console.error('Error in middleware:', err);
  // res.status(500).json({ error: 'Internal Server Error' });
  const resData = responseError(err, err?.message, err?.code, err?.stack);

  res.status(resData.statusCode).json(resData);
});

/**
 * Socket.IO
 *
 */
const httpServer = createServer(app);
initSocket(httpServer); 

// Đây là cổng của server, không phải cổng của API
const port = 3069;

/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - Optional callback function to execute when the server starts.
 */
httpServer.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server is running on http://localhost:${port}`);
});

/**
 * tự động lưu kết quả vào biến môi trường trong postman
 * để mỗi lần lấy token mới không cần thao tác thử công nữa
 */
// const data = pm.response.json();
// pm.environment.set("accessToken", data.accessToken);
// pm.environment.set("refreshToken", data.refreshToken);
