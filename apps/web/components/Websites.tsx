"use client"

import { Website } from "@/types/website";
import { config } from "@/utils/config";
import { useEffect, useState } from "react"
import { WebsitesGradient } from "./WebsitesGradient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { AddWebsite } from "./AddWebsite";
import { NoWebsites } from "./NoWebsites";

export default function Websites() {
    const [websites, setWebsites] = useState<Website[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchWebsites = async () => {
        try {
            const session = await authClient.getSession();

            const response = await fetch(`${config.backendUrl}/website`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.data?.session.token}`,
                },
            });
            if(!response.ok) {
                console.log(`Failed to fetch websites, status: ${response.status}`);
                return;
            }
            const data = await response.json();
            setWebsites(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching websites:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebsites();
        const interval = setInterval(fetchWebsites, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pt-20">
            <WebsitesGradient/>

            <div className="relative z-10 p-8 pt-16 max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
                        Website Monitoring
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Real-time monitoring and performance tracking for your web applications
                    </p>
                    <AddWebsite onWebsiteAdded={fetchWebsites} />
                </div>

                {websites.length === 0 ? (
                    <NoWebsites />
                ) : (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {websites.map((website) => (
                            <motion.div 
                                key={website.id}
                                onClick={() => router.push(`/websites/${website.id}`)}
                                className="group relative bg-black/60 backdrop-blur-sm border border-gray-800/50 hover:border-green-500/50 
                                    rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
        
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

                        
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent rounded-2xl 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-white">{website.name}</h2>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            website.latestTick?.status === 'Up' ? 'bg-green-500/20 text-green-400' :
                                            website.latestTick?.status === 'Down' ? 'bg-red-500/20 text-red-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {website.latestTick?.status || 'Unknown'}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <a href={website.url}
                                           target="_blank" 
                                           rel="noopener noreferrer" 
                                           className="text-green-400 hover:text-green-300 text-sm break-all transition-colors">
                                            {website.url}
                                        </a>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-black/40 rounded-xl">
                                        <div>
                                            <div className="text-gray-400 text-sm mb-1">Response Time</div>
                                            <div className="text-white font-semibold">
                                                {website.latestTick?.response_time_ms || '-'}ms
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-sm mb-1">Last Check</div>
                                            <div className="text-white font-semibold">
                                                {website.latestTick 
                                                    ? new Date(website.latestTick.createdAt).toLocaleString()
                                                    : 'Never'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}