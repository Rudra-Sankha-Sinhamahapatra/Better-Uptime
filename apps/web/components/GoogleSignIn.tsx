'use client';

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export function GoogleSignIn() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/websites',
    });
  };

  return (
    <motion.button
      onClick={handleSignIn}
      className="flex items-center justify-center w-full gap-3 px-6 py-3 bg-black/60 text-white rounded-xl
      border border-gray-800/50 hover:border-green-500/50 backdrop-blur-sm group transition-all duration-300"
      whileHover={{ scale:1.05 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3 }}
    >
        <div className="relative bg-gradient-to-br from-green-500/40 via-transparent to-transparent p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-green-500/30 group-hover:via-transparent group-hover:to-green-500/20 transition-colors" >
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      </div>
    <span className="text-lg font-medium"> Sign in with Google </span>

    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

    <motion.div 
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

    </motion.button>
  );
}