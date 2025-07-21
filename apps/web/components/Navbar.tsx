"use client";

import Image from "next/image"
import Link from "next/link"
import { UserProfile } from "./UserProfile"
import { Session } from "@/types/session"
import { NavbarGradient } from "./ui/NavbarGradient";
import { useState } from "react";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
           <NavbarGradient/>
            <div className="container mx-auto px-4 sm:px-6 py-4 relative">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
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
                    </div>
                        
                    {/* Medium+ Navigation - Show ALL content on medium and large screens */}
                    <div className="hidden sm:flex items-center gap-2 sm:gap-4 md:gap-4 lg:gap-6">
                        <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                            Contact
                        </Link>
                        <Link href="/disclaimer" className="text-amber-300 hover:text-amber-400 transition-colors text-xs sm:text-sm lg:text-base">
                            Notice
                        </Link>
                    </div>

                    {/* Auth - Show on medium+ screens (sm and above) */}
                    <div className="hidden sm:flex items-center gap-4">
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

                                        {/* Mobile Profile and Menu - Clean side-by-side layout */}
                    <div className="sm:hidden flex items-center gap-4">
                        {/* Mobile Profile */}
                        <div className="flex-shrink-0">
                            <UserProfile> 
                                {(session: Session | null) => !session && (
                                    <Link 
                                        href="/signin" 
                                        className="text-gray-300 hover:text-white transition-colors text-sm bg-gray-800/50 px-3 py-1.5 rounded-md border border-gray-700/50"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </UserProfile>
                        </div>

                        {/* Mobile Menu Button - Right next to profile */}
                        <div className="flex-shrink-0">
                            <button
                                className="text-white p-2 bg-black/50 rounded-md hover:bg-black/70 transition-colors border border-gray-700/50"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                {/* Mobile Sidebar - Only for very small screens */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden mt-4 pb-4 border-t border-white/10 relative z-[9997]">
                        <div className="flex flex-col space-y-4 pt-4">
                            {/* Navigation links only - profile is completely separate */}
                            <Link 
                                href="/pricing" 
                                className="text-gray-300 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link 
                                href="/about" 
                                className="text-gray-300 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link 
                                href="/contact" 
                                className="text-gray-300 hover:text-white transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link 
                                href="/disclaimer" 
                                className="text-amber-300 hover:text-amber-400 transition-colors py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Important Notice
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}