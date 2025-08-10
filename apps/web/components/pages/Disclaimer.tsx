import { HeroGradient } from "@/components/ui/HeroGradient";
import DisclaimerHeader from "@/components/disclaimer/DisclaimerHeader";
import DisclaimerContent from "@/components/disclaimer/DisclaimerContent";
import DisclaimerActions from "@/components/disclaimer/DisclaimerActions";

export default function DisclaimerPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 pt-12 pb-24">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-4xl">
        <DisclaimerHeader />
        
        <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 mb-8">
          <DisclaimerContent />
        </div>

        <DisclaimerActions />
      </div>
    </div>
  );
} 