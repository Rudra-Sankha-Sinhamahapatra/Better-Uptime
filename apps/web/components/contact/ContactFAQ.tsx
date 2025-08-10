"use client"
import { faqSection } from "@/utils/data/contactData";

export default function ContactFAQ() {
  return (
    <div className="mt-12 bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
      <h3 className="text-xl font-semibold mb-3 text-green-400 flex items-center gap-3">
        <faqSection.icon className="w-5 h-5 text-white" />
        {faqSection.title}
      </h3>
      <p className="text-gray-400 mb-4">
        {faqSection.description}
      </p>
      <button 
        onClick={() => window.location.href = faqSection.redirectUrl}
        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
      >
        {faqSection.buttonText}
      </button>
    </div>
  );
}