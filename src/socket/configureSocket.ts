import { Server, Socket } from 'socket.io';
import { Application } from 'express';
import socketAuthMiddleware from '../middleware/socket.middleware';
import { User } from '@prisma/client';
import logger from '../utils/logger';
import * as http from "http";

export const configureSocket = (server: http.Server): Server => {
  // Create HTTP server and attach to Express
  const connectedClients: Map<string, string> = new Map();

  // Initialize Socket.IO
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL, // Replace with your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  // Apply authentication middleware
  io.use(socketAuthMiddleware);

  // Attach socket handlers
  initializeHandlers(io, connectedClients);
//   chatHandler(io);

  return io;
};


function initializeHandlers(io: Server, connectedClients:  Map<string, string>): void {
    io.on('connection', (socket: Socket) => {
        const authenticatedUser = socket.user as User;
      
        const userId = authenticatedUser.id;
        connectedClients.set(userId, socket.id);

        logger.info('info', `Client connected: ${userId}`);


        setupSocketHandlers( socket, authenticatedUser);


        // HANDLE DISCONNECTION
        socket.on('disconnect', () => {
            connectedClients.delete(userId);
            logger.info('info', `Client disconnected: ${userId}`);
        });
      

    });
  }

    function setupSocketHandlers(socket: Socket, authenticatedUser: User): void {
        socket.on('send_message', (message: string) => {

            
            socket.emit('receive_message', {
                user: socket.user?.name,
                message,
            });
        });
    }

    function getConnectedClientsCount(connectedClients: Map<string, string>): number {
        return connectedClients.size;
    }
