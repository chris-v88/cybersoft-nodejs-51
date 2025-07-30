import express from 'express';
import rootRouter from './src/routers/root.router';

const app = express();
// express.json(); // Middleware to parse JSON bodies

// giúp body nhận dc dữ liệu từ client gửi lên
app.use(express.json()); // Placeholder for middleware

app.use('/api', rootRouter);

const port = 3069;
/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - Optional callback function to execute when the server starts.
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
