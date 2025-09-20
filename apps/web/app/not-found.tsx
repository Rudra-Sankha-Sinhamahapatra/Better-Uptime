"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative bg-gradient-to-br from-transparent via-green-500/10 to-transparent bg-blur-xl min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(29, 176, 182, 0.15), transparent 60%)",
            "radial-gradient(circle at 100% 100%, rgba(24, 117, 74, 0.74), transparent 60%)",
            "radial-gradient(circle at 0% 100%, rgba(15, 68, 95, 0.15), transparent 60%)",
            "radial-gradient(circle at 100% 0%, rgba(33, 111, 50, 0.15), transparent 60%)",
            "radial-gradient(circle at 0% 0%, rgba(9, 46, 21, 0.15), transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent drop-shadow-lg">
          404
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition-all duration-300 shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
