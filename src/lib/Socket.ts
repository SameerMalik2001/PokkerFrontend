import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io('wws://pokkerbackend.onrender.com', {
      transports: ['websocket'],
      reconnection: true,
    });
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};