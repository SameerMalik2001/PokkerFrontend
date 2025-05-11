import { Button } from '@/components/ui/button'
import { useSocket } from '@/context/Socket.context'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const Controller = ({ roomId }: any) => {
  const socket = useSocket()
  const [ownerUserName, setOwnerUserName] = useState("")
  const { user, isLoaded } = useUser()

  const getRoomOwner = (data: any) => {
    if (data?.status === 200) {
      setOwnerUserName(data?.ownerUserName)
    }
  }

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.on('roomOwnerName', getRoomOwner)

    socket.emit('roomOwner', roomId);
  }, [])


  return (
    <div className='w-full min-h-fit m-3 flex justify-center items-center gap-3'>
      <Button className='bg-red-700 text-white hover:bg-red-600'>Exit</Button>
      {
        isLoaded && user && user?.username === ownerUserName &&
        <>
          <Button className=''>Reveil</Button>
          <Button className='bg-yellow-400 hover:bg-yellow-300'>Reset</Button>
        </>
      }

      <Button className='bg-green-500 hover:bg-green-400'>Invite Link</Button>
    </div>
  )
}

export default Controller