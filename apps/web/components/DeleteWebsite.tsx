"use client";

import { useSession } from "@/context/session-context";
import { config } from "@/utils/config";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash } from "lucide-react";
import React, { useState } from "react";
import { Loading } from "./Loading";
import { Website } from "@/types/website";
import { createPortal } from "react-dom";

interface DeleteWebsiteProps {
  website: Website;
  onWebsiteDeleted: () => Promise<void>;
}

export const DeleteWebsite = ({ website, onWebsiteDeleted }: DeleteWebsiteProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { session, loading: sessionLoading } = useSession();

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (!session?.session?.token) throw new Error("No session token");

      const response = await fetch(`${config.backendUrl}/website/${website.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${session.session.token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete website");

      await onWebsiteDeleted();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting website:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || sessionLoading) return <Loading />;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-400 hover:text-red-400 transition-colors"
        title="Delete Website"
      >
        <Trash className="w-5 h-5" />
      </button>

      {createPortal(
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-red-500/20 via-transparent to-red-500/10 rounded-2xl p-8 w-full max-w-md border border-gray-800/50 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 hover:text-gray-400 text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-6">Delete Website</h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <span className="text-white font-bold">{website.name}</span>?  
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
              document.body
            )}
    </>
  );
};
