'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'

const LandingPageCTA = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) return null // wait until Clerk finishes loading

  return (
    <>
      {user ? (
        <Button
          onClick={() => router.push('/createSession')}
          className='px-6 py-5 rounded-xl shadow border-[2px] border-background hover:border-foreground hover:bg-background hover:text-foreground'
        >
          Start a Session
        </Button>
      ) : (
        <SignInButton>
          <Button
            className='px-6 py-5 rounded-xl shadow border-[2px] border-background hover:border-foreground hover:bg-background hover:text-foreground'
          >
            Start a Session
          </Button>
        </SignInButton>
      )}

      <Button
        className='px-6 py-5 rounded-xl shadow border-[2px] border-background hover:border-foreground hover:bg-background hover:text-foreground'
      >
        Learn More
      </Button>
    </>
  )
}

export default LandingPageCTA
