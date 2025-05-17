'use client'
import { toast } from '@/hooks/use-toast'
import { getSocket } from '@/lib/Socket'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

const JoiningSessionRoute = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user } = useUser()
  const [letIn, setLetIn] = useState(false)
  const socket = getSocket()
  const route = useRouter()

  useEffect(() => {
    if (socket && typeof window !== 'undefined') {
      socket.on('join', (data: any) => {
        if (data?.status === 200) {
          toast({description: data?.msg})
          setLetIn(true)
        }
        if (data?.status === 400) {
          route.push(`/createSession`)
          toast({description: data?.msg, variant: 'destructive'})
        }
      })
    }
  }, [socket])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const roomName = window.location.href.split('/').pop();
      if (socket && isLoaded && user) {
        socket.emit('join', {
          username: user?.username,
          room: roomName,
        });
      } else if(isLoaded && !user) {
        route.push(`/createSession`)
      }
    }
  }, [socket, isLoaded])

  if (letIn) {
    return (
      <>{children}</>
    )
  }

  if (!letIn) {
    <></>
  }
}

export default JoiningSessionRoute