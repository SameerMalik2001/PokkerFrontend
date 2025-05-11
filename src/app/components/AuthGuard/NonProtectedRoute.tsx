'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const NonProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user } = useUser()
  const route = useRouter()


  if (isLoaded && !user) {
    return <>{children}</>
  } else {
    return <></>
  }
}

export default NonProtectedRoute