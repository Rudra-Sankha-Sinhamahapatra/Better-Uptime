"use client"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import { FooterGradient } from "./ui/FooterGradient"

export const Footer = () => {
    return (
        <div className="relative py-12 px-6 bg-black border-t border-gray-800/50">
            <FooterGradient/>
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">BetterUptime</h3>
                        <p className="text-gray-400">Monitor your websites and get notified when they go down or come back online.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/pricing" className="text-gray-400 hover:text-green-400 transition-colors">Pricing</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-green-400 transition-colors">About</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
                        <div className="flex gap-4">
                            <motion.a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-black/60 border border-gray-800/50 hover:border-green-500/50 text-gray-400 hover:text-green-400 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-black/60 border border-gray-800/50 hover:border-green-500/50 text-gray-400 hover:text-green-400 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-black/60 border border-gray-800/50 hover:border-green-500/50 text-gray-400 hover:text-green-400 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} BetterUptime. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}