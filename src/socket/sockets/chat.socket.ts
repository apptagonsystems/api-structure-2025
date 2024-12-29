import { Server, Socket } from 'socket.io';

const chatHandler = (io: Server): void => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.user?.name}`);

    // Listen for a chat message
    socket.on('send_message', (message: string) => {
      console.log(`Message received: ${message}`);
      io.emit('receive_message', {
        user: socket.user?.name,
        message,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user?.name}`);
    });
  });
};

export default chatHandler;
