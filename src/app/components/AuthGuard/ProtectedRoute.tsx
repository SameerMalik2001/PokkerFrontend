'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user } = useUser()
  const route = useRouter()

  useEffect(() => {
      if(isLoaded && !user) {
        route.push('/')
      }
    }, [isLoaded, user]);

  if (isLoaded && !user) {
    return <></>
  } else {
    return <>{children}</>
  }
}

export default ProtectedRoute