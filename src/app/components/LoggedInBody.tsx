'use client'

import React, { useEffect, useState } from 'react'
import ShowData from './ShowData'
import ShowCards from './ShowCards'
import Controller from './Controller'
import { useSocket } from '@/context/Socket.context'
import { useUser } from '@clerk/nextjs'
import { toast } from '@/hooks/use-toast'

export interface userDataType {
  username: string;
  score: string;
  isSelected?: boolean;
}

type Entry = [string, string];

function getLatestValues(data: Entry[]): Record<string, string> {
  const latestMap: Record<string, string> = {};

  for (const [name, value] of data) {
    if (value !== "") {
      latestMap[name] = value;
    }
  }
  return latestMap;
}

const LoggedInBody = ({ roomId }: any) => {
  const socket = useSocket()
  const [data, setData] = useState<userDataType[]>([])
  const [ownerUserName, setOwnerUserName] = useState("")
  const [isReveil, setIsReveil] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('getUsers', roomId);

    const joiner = (data: any) => {
      if(data?.status === 200) {
        toast({description: data?.msg})
      }
    }

    socket.on('join', joiner);

    const handleUsersList = (data: any) => {
      if (data?.status === 200) {
        if (data?.users?.length > 0) {
          const res: userDataType[] = data?.users.map((item: any) => {
            return {
              username: item?.username,
              score: ""
            }
          })
          setData(res)
        }
      }
    };

    socket.on('usersList', handleUsersList);
    // Cleanup
    return () => {
      socket.off('usersList', handleUsersList);
    };
  }, [socket, roomId]);

  useEffect(() => {
    if (!socket || !roomId) return

    const handlePreviousMessagesOfRoom = (data: any) => {
      if (data?.status === 200) {
        const previousMessage: Record<string, string> = getLatestValues(data?.previousMessages)
        setData((prev: userDataType[]) => {
          if (prev?.length > 0) {
            let temp = [...prev]
            const res: userDataType[] = temp?.map((item: userDataType) => {
              item.score = previousMessage[item?.username] ? previousMessage[item?.username] : ''
              return item
            })
            return res
          }
          return []
        })
      }
    }

    socket.on('previousMessagesOfRoom', handlePreviousMessagesOfRoom);

    if (ownerUserName === user?.username && isReveil) {
      socket.emit('getPreviousRoomMessage', roomId);
      setIsReveil(false)
    }
  }, [ownerUserName, isReveil])
  console.log(isReveil)


  useEffect(() => {
    if (!socket || !roomId) return;
    const getRoomOwner = (data: any) => {
      if (data?.status === 200) {
        setOwnerUserName(data?.ownerUserName)
      }
    }

    const updateUserDataSelected = (data: any) => {
      if (data?.status === 200) {
        setData((prev: userDataType[]) => {
          let temp = [...prev]
          const res = temp.map((item: userDataType) => {
            if (data?.data?.includes(item?.username)) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
            return item
          })

          return res
        })
      }
    }

    socket.on('roomOwnerName', getRoomOwner)
    socket.on('NumberSelectedUser', updateUserDataSelected)
    socket.emit('roomOwner', roomId);
  }, [socket])

  return (
    <div className=' items-center mt-3 flex flex-col'>
      <div className='w-[70%] md:w-[90%] min-h-fit'>
        <ShowData data={data} />
      </div>
      <div className='w-[70%] md:w-[90%] min-h-fit'>
        <ShowCards roomId={roomId} data={data} />
      </div>

      <div className='fixed backdrop-blur-[2px] bg-gradient-to-t from-background via-transparent to-transparent -bottom-[5px] left-0 w-full min-h-fit'>
        <Controller setData={setData} roomId={roomId} setIsReveil={setIsReveil} />
      </div>

      <div className='w-full h-[100px]'></div>
    </div>
  )
}

export default LoggedInBody