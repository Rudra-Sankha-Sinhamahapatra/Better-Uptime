import { DisclaimerCard, DisclaimerSection } from "@/types/disclaimer";
import { CheckCircle, Ban, Search, Clipboard } from "lucide-react";


export const pageContent = {
  title: "Important Notice for Website Monitoring",
  backButton: "Go Back",
  confirmButton: "I Understand - Add My Website",
  confirmUrl: "/websites"
};

export const ddosProtectionServices = [
  "Vercel DDoS Protection - Turn off in your Vercel dashboard settings",
  "Cloudflare Bot Fight Mode - Disable in Cloudflare security settings", 
  "AWS Shield Advanced - Configure to allow monitoring requests",
  "CDN-based protection - Whitelist our monitoring IPs",
  "Rate limiting services - Adjust thresholds to accommodate monitoring"
];

export const whyItMatters = {
  description: "Our monitoring system works by sending regular HTTP requests to your website to check its availability and response time. DDoS protection services often block or rate-limit these automated requests, which can result in:",
  issues: [
    "False downtime alerts when your site is actually online",
    "Inaccurate response time measurements", 
    "Monitoring requests being blocked entirely",
    "Inability to detect real outages"
  ]
};

export const recommendedActionCards: DisclaimerCard[] = [
  {
    title: "For Vercel Users:",
    content: "Go to your project settings → Security → DDoS Protection and disable it for websites you want to monitor.",
    color: "green"
  },
  {
    title: "For Cloudflare Users:",
    content: "Navigate to Security → Bots → Configure Bot Fight Mode and set it to \"Off\" or create custom rules to allow monitoring traffic.",
    color: "blue"
  },
  {
    title: "Alternative Solution:",
    content: "If you must keep DDoS protection enabled, contact our support team to whitelist our monitoring IP addresses in your protection service.",
    color: "purple"
  }
];

export const beforeAddingWebsite = [
  "Your website responds to HTTP/HTTPS requests without captchas",
  "No aggressive rate limiting is in place for automated requests",
  "Bot protection services are configured to allow monitoring", 
  "Your hosting provider allows external monitoring services",
  "CORS policies don't block our monitoring requests"
];

export const helpSection = {
  title: "Need Help?",
  content: "If you're unsure about your current DDoS protection settings or need assistance configuring your website for monitoring, please contact our support team. We're here to help ensure accurate monitoring of your websites.",
  color: "amber" as const
};

export const disclaimerSections: DisclaimerSection[] = [
  {
    id: "ddos-protection",
    title: "Please Disable DDoS Protection Services", 
    icon: Ban,
    content: "To ensure accurate website monitoring, please disable any DDoS protection services on your websites, including but not limited to:",
    items: ddosProtectionServices
  },
  {
    id: "why-matters",
    title: "Why This Matters",
    icon: Search, 
    content: whyItMatters.description,
    items: whyItMatters.issues
  },
  {
    id: "recommended-actions",
    title: "Recommended Actions",
    icon: CheckCircle,
    content: "",
    cards: recommendedActionCards
  },
  {
    id: "before-adding",
    title: "Before Adding Your Website",
    icon: Clipboard,
    content: "Please ensure that:",
    items: beforeAddingWebsite
  }
];
