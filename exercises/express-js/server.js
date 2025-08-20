import 'dotenv/config'; 

import express from 'express';
import rootRouter from './src/routers/root.router';
import cors from 'cors';

import { responseError } from './src/common/helpers/response.helpers';
import { appError } from './src/common/app-error/app-error.error';
import { initGoogleAuth20 } from './src/common/passports/google-auth20.passport';

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
  console.error('Error in middleware:', err);
  // res.status(500).json({ error: 'Internal Server Error' });
  const resData = responseError(err, err?.message, err?.code, err?.stack);

  res.status(resData.statusCode).json(resData);
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


/**
 * tự động lưu kết quả vào biến môi trường trong postman
 * để mỗi lần lấy token mới không cần thao tác thử công nữa
 */
// const data = pm.response.json();
// pm.environment.set("accessToken", data.accessToken);
// pm.environment.set("refreshToken", data.refreshToken);