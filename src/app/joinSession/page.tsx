'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Head from '../components/Head';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useSocket } from '@/context/Socket.context';
import { toast } from '@/hooks/use-toast';

const page = () => {
  const route = useRouter()
  const socket = useSocket();

  const [roomName, setRoomName] = useState('');
  const { user } = useUser();

  const roomNameRef = useRef(roomName);

  // Keep ref in sync
  useEffect(() => {
    roomNameRef.current = roomName;
  }, [roomName]);

  useEffect(() => {
    if (socket) {
      socket.on('join', (data: any) => {
        if (data?.status === 200) {
          toast({ description: data?.msg })
          route.push(`/${roomNameRef.current}`)
        }
        if (data?.status === 400) {
          toast({ description: data?.msg,variant: "destructive", })
        }
      })
    }
  }, [socket])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (socket) {
      socket.emit('join', {
        username: user?.username,
        room: roomName,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Head />
      <div className='flex-grow w-full flex justify-center items-center'>
        <div className="bg-background border-[1px] border-foreground rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">Join a Room</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-gray-400 font-medium mb-2">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-foreground border-[2px] border-gray-300  text-background hover:text-foreground py-2 rounded-md hover:bg-background transition duration-200"
            >
              Join Room
            </button>
          </form>
          <div className='w-full  mt-2 flex justify-center'>
            <Link href={`/createSession`}>
              <p onClick={()=> route.push(`/createSession`)} className=' cursor-pointer hover:text-gray-400'>Create Room</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
