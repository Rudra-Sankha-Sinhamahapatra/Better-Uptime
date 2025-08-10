"use client"
import { pageContent } from "@/utils/data/disclaimerData";

export default function DisclaimerActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        onClick={() => window.history.back()}
        className="px-8 py-3 text-gray-400 hover:text-white transition-colors border border-green-500/20 rounded rounded-full"
      >
        {pageContent.backButton}
      </button>
      <button 
        onClick={() => window.location.href = pageContent.confirmUrl}
        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
      >
        {pageContent.confirmButton}
      </button>
    </div>
  );
}
