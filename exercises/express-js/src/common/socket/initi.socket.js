import { Server } from 'socket.io';

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on('connection', (socket) => {
    console.log(`🚀 ~ initSocket ~ socket:`, socket.id);
  });
};
