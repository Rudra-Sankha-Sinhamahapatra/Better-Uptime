import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Navbar } from "@/components/Navbar";
import { WebsitesGradient } from "@/components/ui/WebsitesGradient";

export default function Signin() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <Navbar />
        <WebsitesGradient />

        <div className="relative z-10 text-center max-w-md w-full backdrop-blur-sm bg-black/10 rounded-2xl p-12 border-gray-800/50">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
            Welcome Back
        </h1>
        <p className="text-gray-400 text-lg mb-8">
            Sign in to monitor your websites and get real-time updates
        </p>
         <GoogleSignIn />
        </div>
    </div>
  );
}