import { AlertTriangle } from "lucide-react";
import { pageContent } from "@/utils/data/disclaimerData";

export default function DisclaimerHeader() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
        {pageContent.title}
      </h1>
      
      <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-green-400 flex items-center justify-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-300" />
          DDoS Protection & Monitoring Compatibility
        </h2>
      </div>
    </>
  );
}
