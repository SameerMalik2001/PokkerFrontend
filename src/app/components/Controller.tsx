import { Button } from '@/components/ui/button'
import { useSocket } from '@/context/Socket.context'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { userDataType } from './LoggedInBody'
import { toast } from '@/hooks/use-toast'

const Controller = ({ roomId, setIsReveil, setData }: any) => {
  const socket = useSocket()
  const [ownerUserName, setOwnerUserName] = useState("")
  const { user, isLoaded } = useUser()
  const route = useRouter()

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

  const resetMessage = () => {
    setData((prev: userDataType[]) => {
      const temp = [...prev]
      const res = temp.map((item: userDataType) => {
        item.score = ""
        item.isSelected = false
        return item
      })
      return res
    })
  }

  useEffect(() => {
    if (!socket) return
    socket.on('resetMessage', resetMessage)
  })

  const resetData = () => {
    if (socket && ownerUserName === user?.username) {
      socket.emit('resetMessage', roomId)

    } else {
      console.log(socket, ownerUserName === user?.username);
    }
  }

  const handleCopy = async (data: string) => {
    try {
      await navigator.clipboard.writeText(data);
      toast({description: "Invitation Link is copied!"})
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const LinkCopy = () => {
    if(typeof window !== 'undefined') {
      const link = window.location.href
      handleCopy(link)
    }
  }


  return (
    <div className='w-full min-h-fit m-3 flex justify-center items-center gap-3'>
      <Button onClick={() => window.location.href = '/createSession'}  className='bg-red-700 text-white hover:bg-red-600'>Exit</Button>
      {
        isLoaded && user && user?.username === ownerUserName &&
        <>
          <Button onClick={() => setIsReveil(true)} className=''>Reveil</Button>
          <Button onClick={() => resetData()} className='bg-yellow-400 hover:bg-yellow-300'>Reset</Button>
        </>
      }

      <Button onClick={() => LinkCopy()} className='bg-green-500 hover:bg-green-400'>Invite Link</Button>
    </div>
  )
}

export default Controller