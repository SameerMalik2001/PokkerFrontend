'use client';
import { getSocket } from '@/lib/Socket';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const path = usePathname()

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
