import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'

const LandingPageCTA = () => {
  return (
    <>
      <SignInButton>
        <Button
          className='px-6 py-5 rounded-xl shadow border-[2px] border-background hover:border-foreground hover:bg-background hover:text-foreground'
        >
          Start a Session
        </Button>
      </SignInButton>

      <Button className='px-6 py-5 rounded-xl shadow border-[2px] border-background hover:border-foreground hover:bg-background hover:text-foreground'>
        Learn More
      </Button>
    </>
  )
}

export default LandingPageCTA
