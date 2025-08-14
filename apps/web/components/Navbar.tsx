"use client";

import Image from "next/image"
import Link from "next/link"
import { UserProfile } from "./UserProfile"
import { Session } from "@/types/session"
import { NavbarGradient } from "./ui/NavbarGradient";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { useSession } from "@/context/session-context";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { refreshSession } = useSession();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        await refreshSession(); 
        setIsProfileDropdownOpen(false);
        window.location.replace("/signin");
    };
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <NavbarGradient />
            <div className="container mx-auto px-4 sm:px-6 py-4 relative">
                {/* Mobile Layout - Completely separate structure */}
                <div className="sm:hidden">
                    <div className="flex items-center justify-between w-full">

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

                        {/* Right side - Absolute positioned elements */}
                        <div className="relative w-32 h-10">
                            {/* Mobile Profile - Absolute left */}
                            <div className="absolute left-0 top-0">
                                <UserProfile>
                                    {(session: Session | null) => !session ? (
                                        <Link
                                            href="/signin"
                                            className="text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-colors text-xs px-2 py-1 rounded border border-green-600/50 whitespace-nowrap"
                                        >
                                            Sign In
                                        </Link>
                                    ) : (
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                                className="relative w-8 h-8 rounded-full overflow-hidden border border-green-500/50 hover:border-green-400/70 transition-all duration-300"
                                            >
                                                <Image
                                                    src={session.user.image || '/default-avatar.png'}
                                                    alt="Profile"
                                                    width={32}
                                                    height={32}
                                                    className="object-cover"
                                                />
                                            </button>

                                            {isProfileDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-br from-green-500/40 via-black/50 to-green-500/20 backdrop-blur-md border border-gray-700/50 z-[9999]"
                                                >
                                                    <div className="p-3 border-b border-gray-800/50">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-800/50">
                                                                <Image
                                                                    src={session.user.image || '/default-avatar.png'}
                                                                    alt="Profile"
                                                                    width={32}
                                                                    height={32}
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-medium text-sm">{session.user.name}</p>
                                                                <p className="text-gray-400 text-xs">{session.user.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleSignOut}
                                                        className="w-full p-2 text-left text-white hover:bg-gradient-to-br hover:from-green-500/40 hover:via-black/50 hover:to-green-500/20 transition-colors duration-300 flex items-center gap-2 text-sm"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Sign out
                                                    </button>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </UserProfile>
                            </div>

                            {/* Mobile Menu Button - Absolute right */}
                            <div className="absolute right-0 top-0">
                                <button
                                    className="text-white p-2 bg-black/50 rounded-md hover:bg-black/70 transition-colors border border-gray-700/50"
                                    onClick={toggleMobileMenu}
                                    aria-label="Toggle menu"
                                >
                                    <svg
                                        className="w-4 h-4"
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
                    </div>
                </div>

                {/* Desktop/Tablet Layout - Medium+ screens */}
                <div className="hidden sm:flex items-center justify-between">
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

                    {/* Navigation */}
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-4 lg:gap-6">
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

                    {/* Auth */}
                    <div className="flex items-center gap-4">
                        <UserProfile>
                            {(session: Session | null) => !session ? (
                                <>
                                    <Link
                                        href="/signin"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/signin"
                                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg transition-colors border border-green-600/30"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="relative w-10 h-10 rounded-full overflow-hidden border border-green-500/50 hover:border-green-400/70 transition-all duration-300"
                                    >
                                        <Image
                                            src={session.user.image || '/default-avatar.png'}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    </button>

                                    {isProfileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute right-0 mt-2 w-64 rounded-xl bg-gradient-to-br from-green-500/40 via-black/50 to-green-500/20 backdrop-blur-md border border-gray-700/50 z-[9999]"
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

                                            <button
                                                onClick={handleSignOut}
                                                className="w-full p-3 text-left text-white hover:bg-gradient-to-br hover:from-green-500/40 hover:via-black/50 hover:to-green-500/20 transition-colors duration-300 flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </UserProfile>
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