'use client'

import React, { useEffect, useState } from 'react'
import ShowData from './ShowData'
import ShowCards from './ShowCards'
import Controller from './Controller'
import { useSocket } from '@/context/Socket.context'
import { useUser } from '@clerk/nextjs'

interface userDataType {
  username: string;
  score: string
}

const LoggedInBody = ({ roomId }: any) => {
  const socket = useSocket()
  const [data, setData] = useState<userDataType[]>([])

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('getUsers', roomId);

    //     {
    //   "status": 200,
    //   "room": "ramuu",
    //   "users": [
    //     {
    //       "id": "1ggMWZ-KiM3E5Iv7AAAZ",
    //       "username": "Sameer"
    //     },
    //     {
    //       "id": "mIN6kHpLbqn4rQDuAAAT",
    //       "username": "Sameer"
    //     }
    //   ],
    //   "messages": []
    // }

    const handleUsersList = (data: any) => {
      if (data?.status === 200) {
        if (data?.users?.length > 0) {
          const res: userDataType[] = data?.users.map((item: any) => {
            return {
              username: item?.username,
              score: -1
            }
          })
          setData(res)
        }
      }
    };

    const handleUpcommingMesage = (data: any) => {
      setData((prev: userDataType[]) => {
        if (prev?.length > 0) {
          let temp = [...prev]
          const res: userDataType[] = temp?.map((item: userDataType) => {
            if (item.username === data[0]) {
              item.score = data[1]
            }
            return item
          })
          return res
        }
        return []
      })
    }

    socket.on('usersList', handleUsersList);
    socket.on('message', handleUpcommingMesage);

    // Cleanup
    return () => {
      socket.off('usersList', handleUsersList);
    };
  }, [socket, roomId]);

  return (
    <div className=' items-center mt-3 flex flex-col'>
      <div className='w-[70%] md:w-[90%] min-h-fit'>
        <ShowData data={data}/>
      </div>
      <div className='w-[70%] md:w-[90%] min-h-fit'>
        <ShowCards roomId={roomId}/>
      </div>

      <div className='fixed backdrop-blur-[2px] bg-gradient-to-t from-background via-transparent to-transparent -bottom-[5px] left-0 w-full min-h-fit'>
        <Controller roomId={roomId}/>
      </div>

      <div className='w-full h-[100px]'></div>
    </div>
  )
}

export default LoggedInBody