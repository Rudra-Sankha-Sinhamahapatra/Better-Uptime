import { FAQ, PricingPlan } from "@/types/pricing";

export const pageContent = {
  title: "Simple, Transparent Pricing",
  subtitle: "Choose the plan that fits your needs. All plans include real-time monitoring, instant alerts, and detailed analytics.",
  faqTitle: "Frequently Asked Questions",
  ctaTitle: "Ready to get started?",
  ctaSubtitle: "Join thousands of businesses monitoring their websites with BetterUptime",
  ctaButtonText: "Start Monitoring Now",
  ctaUrl: "/websites"
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "/month",
    features: [
      "Monitor up to 5 websites",
      "5-minute check intervals",
      "Email notifications",
      "Basic uptime reports",
      "Community support"
    ],
    buttonText: "Get Started Free",
    buttonStyle: "secondary"
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    period: "/month",
    features: [
      "Monitor up to 50 websites",
      "1-minute check intervals",
      "Email & SMS notifications",
      "Advanced analytics",
      "Multiple monitoring locations",
      "Priority support"
    ],
    buttonText: "Start Pro Trial",
    buttonStyle: "primary",
    featured: true,
    featuredText: "Most Popular"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    period: "/month",
    features: [
      "Unlimited websites",
      "30-second check intervals",
      "All notification channels",
      "Custom integrations",
      "Global monitoring network",
      "Dedicated support"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "primary"
  }
];

export const faqs: FAQ[] = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Our Starter plan is completely free forever. Pro and Enterprise plans come with a 14-day free trial."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fees, no hidden costs. You only pay for what you use."
  }
];
