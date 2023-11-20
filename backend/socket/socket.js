import { Server } from 'socket.io';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173'
    }
  });

  io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`user disconnected ${socket.id}`);
    });
  });
};

export default initializeSocket;
