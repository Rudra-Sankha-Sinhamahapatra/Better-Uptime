import { HeroGradient } from "@/components/ui/HeroGradient";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingCards from "@/components/pricing/PricingCards";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 pt-8 pb-20">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-6xl mt-6">
        <PricingHeader />
        <PricingCards />
        <PricingFAQ />
        <PricingCTA />
      </div>
    </div>
  );
} 