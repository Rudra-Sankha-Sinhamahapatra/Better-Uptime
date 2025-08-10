"use client"

import { GoogleSignIn } from "@/components/GoogleSignIn";
import { WebsitesGradient } from "@/components/ui/WebsitesGradient";
import Image from "next/image";

export default function Signin() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <WebsitesGradient />

      <div className="relative z-10 text-center max-w-xl w-full backdrop-blur-sm bg-black/10 rounded-2xl p-12 border border-gray-800/50">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image
            src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/4/supabase-icon-kpjasdqlnu8exakst6f44r.png/supabase-icon-5uqgeeqeknngv9las8zeef.png?_a=DAJFJtWIZAAC"
            alt="Logo"
            width={28}
            height={28}
            className="hover:opacity-80 transition-opacity"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
            Welcome Back
          </h1>
        </div>
        <p className="text-gray-400 text-lg mb-8">
          Sign in to monitor your websites and get real-time updates
        </p>
        <div className="relative overflow-hidden rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/10 via-transparent to-transparent mb-8">
          <img
            src="https://pbs.twimg.com/media/Gx__CQNXkAA9nIQ?format=jpg&name=4096x4096"
            alt="Monitoring illustration"
            className="w-full h-full object-cover opacity-95"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 60%)",
            }}
          />
        </div>
        <GoogleSignIn />
      </div>
    </div>
  );
}