import { ContactMethod, SupportHour, SocialMediaLink, QuickSupportContent, ContactSection } from "@/types/contact";
import { Mail, Clock, Zap, Globe, Lightbulb } from "lucide-react";

export const queryTypes = [
  "General Inquiry",
  "Technical Support", 
  "Billing Question",
  "Feature Request",
  "Partnership"
] as const;

export const contactMethods: ContactMethod[] = [
  {
    title: "General Inquiries",
    email: "hello@betteruptime.com"
  },
  {
    title: "Technical Support", 
    email: "workforrudra24@gmail.com"
  },
  {
    title: "Enterprise Sales",
    email: "rsankhasi@gmail.com"
  }
];

export const supportHours: SupportHour[] = [
  {
    days: "Monday - Friday",
    hours: "9:00 AM - 6:00 PM UTC"
  },
  {
    days: "Saturday", 
    hours: "10:00 AM - 4:00 PM UTC"
  },
  {
    days: "Sunday",
    hours: "Closed"
  }
];

export const socialMediaLinks: SocialMediaLink[] = [
  {
    name: "Twitter",
    url: "https://x.com/RudraSankha",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    )
  },
  {
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/rudra-sankha-sinhamahapatra-6311aa1bb/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: "GitHub",
    url: "https://github.com/Rudra-Sankha-Sinhamahapatra/Better-Uptime", 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  }
];

export const quickSupportContent: QuickSupportContent = {
  liveChatText: "Need immediate help?",
  liveChatButton: "Open Live Chat",
  docsText: "Check our knowledge base:",
  docsButton: "View Documentation"
};

export const contactSections: ContactSection[] = [
  {
    id: "direct-contact",
    title: "Direct Contact",
    icon: Mail,
    content: contactMethods
  },
  {
    id: "support-hours", 
    title: "Support Hours",
    icon: Clock,
    content: supportHours,
    note: "* Emergency support available 24/7 for Enterprise customers"
  },
  {
    id: "quick-support",
    title: "Quick Support", 
    icon: Zap,
    content: quickSupportContent
  },
  {
    id: "social-media",
    title: "Follow Us",
    icon: Globe, 
    content: socialMediaLinks
  }
];

export const faqSection = {
  title: "Frequently Asked Questions",
  icon: Lightbulb,
  description: "Before reaching out, you might find your answer in our comprehensive FAQ section.",
  buttonText: "View FAQ",
  redirectUrl: "/pricing"
};

export const pageContent = {
  title: "Get in Touch",
  subtitle: "Have questions, need support, or want to share feedback? We'd love to hear from you.",
  formTitle: "Send us a Message",
  formFields: {
    name: {
      label: "Name",
      placeholder: "Your name",
      type: "text"
    },
    email: {
      label: "Email", 
      placeholder: "your@email.com",
      type: "email"
    },
    queryType: {
      label: "Subject",
      options: queryTypes
    },
    query: {
      label: "Message",
      placeholder: "Tell us how we can help you...",
      rows: 5
    }
  },
  submitButton: {
    loading: "Sending...",
    default: "Send Message"
  },
  messages: {
    loggedIn: "✅ Logged in as",
    success: "✅ Thank you! Your message has been sent successfully.",
    error: "❌"
  }
};
