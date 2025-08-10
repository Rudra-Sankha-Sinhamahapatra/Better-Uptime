"use client"
import { PricingPlan } from "@/types/pricing";
import { pricingPlans } from "@/utils/data/pricingData";

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const cardClasses = plan.featured 
    ? "bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border-2 border-green-500/50 relative"
    : "bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border border-gray-800/50 hover:border-green-500/50 transition-all duration-300";

  const buttonClasses = plan.buttonStyle === "primary"
    ? "w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
    : "w-full px-4 py-3 text-gray-400 hover:text-white transition-colors rounded rounded-full border border-green-500/20";

  return (
    <div className={cardClasses}>
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {plan.featuredText}
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-green-400">${plan.price}</span>
        <span className="text-gray-400">{plan.period}</span>
      </div>
      
      <ul className="text-left space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-white">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={buttonClasses}>
        {plan.buttonText}
      </button>
    </div>
  );
};

export default function PricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {pricingPlans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
