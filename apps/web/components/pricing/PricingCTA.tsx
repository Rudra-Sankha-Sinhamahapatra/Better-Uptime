"use client"
import { pageContent } from "@/utils/data/pricingData";

export default function PricingCTA() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-white">{pageContent.ctaTitle}</h2>
      <p className="text-gray-400 mb-6">{pageContent.ctaSubtitle}</p>
      <button 
        onClick={() => window.location.href = pageContent.ctaUrl}
        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
      >
        {pageContent.ctaButtonText}
      </button>
    </div>
  );
}
