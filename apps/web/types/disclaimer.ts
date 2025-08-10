export interface DisclaimerSection {
    id: string;
    title: string;
    icon: any;
    content: string;
    items?: string[];
    cards?: DisclaimerCard[];
  }
  
  export interface DisclaimerCard {
    title: string;
    content: string;
    color: "green" | "blue" | "purple" | "amber";
  }