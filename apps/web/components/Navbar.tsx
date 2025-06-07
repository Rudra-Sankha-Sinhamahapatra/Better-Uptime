"use client";

import Image from "next/image"
import Link from "next/link"
import { UserProfile } from "./UserProfile"
import { Session } from "@/types/session"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Image 
                                src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/4/supabase-icon-kpjasdqlnu8exakst6f44r.png/supabase-icon-5uqgeeqeknngv9las8zeef.png?_a=DAJFJtWIZAAC" 
                                alt="Logo" 
                                width={24} 
                                height={24} 
                                className="hover:opacity-80 transition-opacity"
                            />
                            <span className="text-white font-semibold text-lg">BetterUptime</span>
                        </Link>
                        
                        <div className="flex items-center gap-6">
                            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                                Pricing
                            </Link>
                            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <UserProfile> 
                            {(session: Session | null) => !session && (
                                <>
                                    <Link 
                                        href="/signin" 
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link 
                                        href="/signin" 
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </UserProfile>
                    </div>
                </div>
            </div>
        </nav>
    )
}