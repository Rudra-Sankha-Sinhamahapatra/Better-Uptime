export interface PricingPlan {
    id: string;
    name: string;
    price: number;
    period: string;
    features: string[];
    buttonText: string;
    buttonStyle: "primary" | "secondary";
    featured?: boolean;
    featuredText?: string;
  }
  
  export interface FAQ {
    question: string;
    answer: string;
  }