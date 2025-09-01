import 'dotenv/config';

import cors from 'cors';
import { buildSchema } from 'graphql';
import express from 'express';
import { createServer } from 'http';
import rootRouter from './src/routers/root.router';
import { ruruHTML } from 'ruru/server';

import { appError } from './src/common/app-error/app-error.error';
import { createHandler } from 'graphql-http/lib/use/express';
import { responseError } from './src/common/helpers/response.helpers';
import { initGoogleAuth20 } from './src/common/passports/google-auth20.passport';
import { initSocket } from './src/common/socket/initi.socket';
import { schema } from './src/common/graphql/schema.graphql';
import { root } from './src/common/graphql/root.graphql';
import { protectGraphQL } from './src/common/graphql/protect.graphql';

const app = express();
// express.json(); // Middleware to parse JSON bodies

// giúp body nhận dc dữ liệu từ client gửi lên
app.use(express.json()); // Placeholder for middleware

// luôn để cors trước router api
app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

// luôn luôn để trước router
initGoogleAuth20();

/**
 * ruru
 */
// Serve the GraphiQL IDE.
app.get('/ruru', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

/**
 * GraphQL
 */
// Create and use the GraphQL handler.
// app.all(
//   '/graphql',
//   createHandler({
//     // trả callback function
//     schema: schema,
//     rootValue: root,
//   }),
// );
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
        context: async (req) => {
            // 1) user
            // 2) null
            const user = await protectGraphQL(req);
            return { user: user }
        },
    })
);


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
