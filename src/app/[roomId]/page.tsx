import JoiningSessionRoute from '../components/AuthGuard/JoiningSessionRoute';
import ProtectedRoute from '../components/AuthGuard/ProtectedRoute';
import Head from '../components/Head';
import LoggedInBody from '../components/LoggedInBody';


export default async function page({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {

  const { roomId } = await params;

  return (
    <JoiningSessionRoute>
      <ProtectedRoute>
        <div className="min-h-screen flex-col w-screen bg-background text-foreground">
          <Head />
          <LoggedInBody roomId={roomId} />
        </div>
      </ProtectedRoute>
    </JoiningSessionRoute>
  )
}