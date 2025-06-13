"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Session } from "@/types/session";
import { UserProfileProps } from "@/types/userProfile";
import { useRouter } from "next/navigation";

export function UserProfile({children}: UserProfileProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        setSession(null);
        window.location.replace("/signin");
    };

    useEffect(() => {
        const fetchSession = async () => {
            const response = await authClient.getSession();
            if ('data' in response && response.data) {
                setSession(response.data as Session);
            } else {
                setSession(null);
            }
        };
        
        fetchSession();
    }, [router]);

    if (!session) {
        return <>{children?.(null)}</>
    };

    return (
        <>
        <div className="fixed top-3 right-10 z-[9999]">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-800/50 hover:border-green-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
            >
                <Image
                    src={session.user.image || '/default-avatar.png'}
                    alt="Profile"
                    fill
                    className="object-cover"
                />
            </motion.button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl  bg-gradient-to-br from-green-500/40 via-black/50 to-green-500/20 backdrop-blur-md"
                >
                    <div className="p-4 border-b border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-800/50">
                                <Image
                                    src={session.user.image || '/default-avatar.png'}
                                    alt="Profile"
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white font-medium">{session.user.name}</p>
                                <p className="text-gray-400 text-sm">{session.user.email}</p>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleSignOut}
                        className="w-full p-3 text-left text-white hover:bg-gradient-to-br hover:from-green-500/40 hover:via-black/50 hover:to-green-500/20 transition-colors duration-300 flex items-center gap-2"
                        whileHover={{ x: 5 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                    </motion.button>
                </motion.div>
            )}
        </div>
      {children?.(session)}</>
    );
}