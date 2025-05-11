'use client';

import { Skeleton } from '@/components/ui/skeleton'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import React, { Suspense, useEffect } from 'react'
import ThemeButton from './ThemeButton';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Head = () => {
  const { isLoaded, user } = useUser()
  const navigate = useRouter()

  return (
    <Suspense>
      <div className='bg-background w-full min-h-[70px] xs:pb-0 pb-3 flex-col gap-4 xs:flex-row flex justify-between items-start xs:items-center px-10 border-b'>
        <h1 className='text-foreground md:text-3xl xs:text-xl text-2xl font-custom'>KAAM PURA.</h1>
        <div className='flex gap-3 items-center justify-between xs:w-auto w-full'>
          {
            isLoaded && (<>
              <div>
                <SignedOut>
                  <SignInButton >
                    <Button className='border-[2px] border-foreground px-3 flex justify-center items-center h-[36px] rounded-lg cursor-pointer bg-foreground text-background hover:bg-background hover:text-foreground'>
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
              <div>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              <ThemeButton />
            </>)
          }
        </div >

        {
          !isLoaded && <Skeleton className='h-[28px] w-[28px] bg-gray-300 rounded-full'></Skeleton>
        }
      </div >
    </Suspense>
  )
}

export default Head