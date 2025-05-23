import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io('https://pokkerbackend.onrender.com', {
      transports: ['websocket'],
      reconnection: true,
    });
  }
  return socket;
};