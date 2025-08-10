"use client";
import { authClient } from "@/lib/auth-client";
import { AddWebsiteProps } from "@/types/website";
import { config } from "@/utils/config";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useState } from "react";


export const AddWebsite = ({ onWebsiteAdded }: AddWebsiteProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const session = await authClient.getSession();
            const response = await fetch(`${config.backendUrl}/website`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.data?.session.token}`,
                },
                body: JSON.stringify({ name, url }),
            });

            if (!response.ok) throw new Error("Failed to add website");

            setName("");
            setUrl("");
            setIsModalOpen(false);

            if (onWebsiteAdded) {
                setTimeout(() => {
                    onWebsiteAdded();
                }, 2000);
            }
        } catch (error) {
            console.error("Error adding website:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold mt-4 
                    hover:bg-green-700 transition-all duration-300"
            >
                Add Website
            </button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 w-full max-w-md border border-gray-800/50 relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsModalOpen(false)}>
                                <X className="w-6 h-6 hover:text-gray-400 text-white transition-colors" />
                            </div>
                            <h2 className="text-2xl font-semibold text-white mb-6">Add New Website</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-400 mb-2">Website Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50"
                                        placeholder="My Website"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-400 mb-2">Website URL</label>
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/50"
                                        placeholder="https://example.com"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}

                                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold 
                                        hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {loading ? "Adding..." : "Add Website"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}