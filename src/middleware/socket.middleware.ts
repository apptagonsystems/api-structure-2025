import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import JWTHelper from '../utils/jwt-utils';

declare module 'socket.io' {
  interface Socket {
    user?: User;
  }
}

const socketAuthMiddleware = async (socket: Socket, next: (err?: ExtendedError) => void) => {

  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }

  try {
    const decoded = await JWTHelper.verifyToken(token) as User;
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
};

export default socketAuthMiddleware;
