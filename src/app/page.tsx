import { Suspense } from "react";
import NonProtectedRoute from "./components/AuthGuard/NonProtectedRoute";
import Head from "./components/Head";
import LandingPageBody from "./components/LandingPageBody";
export default function Home() {


  return (
    <NonProtectedRoute>
      <div className="min-h-screen flex-col max-w-screen bg-background text-foreground">
        <Head />
        <LandingPageBody />
      </div>
    </NonProtectedRoute>
  );
}
