import { Rocket, Lightbulb, Settings, Star, Target } from "lucide-react";

export const aboutSections = [
  {
    icon: Rocket,
    title: "Our Mission",
    content: `At BetterUptime, we believe every business deserves reliable website monitoring that's both powerful and affordable. We're dedicated to providing real-time insights into your website's performance, helping you maintain exceptional uptime and deliver the best experience to your users.`
  },
  {
    icon: Lightbulb,
    title: "Why We Built This",
    content: `Website downtime can cost businesses thousands of dollars and damage customer trust. Traditional monitoring solutions are often expensive, complex, or lack the features you actually need. We created BetterUptime to solve these problems:`,
    list: [
      "Simple, intuitive interface that anyone can use",
      "Real-time monitoring with instant notifications",
      "Affordable pricing for businesses of all sizes",
      "Detailed analytics and performance insights",
      "Reliable alert system via email and SMS"
    ]
  },
  {
    icon: Settings,
    title: "How It Works",
    steps: [
      { title: "1. Monitor", desc: "We continuously check your websites from multiple locations worldwide" },
      { title: "2. Detect", desc: "Instantly identify downtime, slow responses, or errors on your sites" },
      { title: "3. Alert", desc: "Get notified immediately via email, SMS, or your preferred channels" }
    ]
  },
  {
    icon: Star,
    title: "Key Features",
    features: [
      [
        "Real-time website monitoring",
        "Instant downtime alerts",
        "Performance analytics",
        "Multiple notification channels"
      ],
      [
        "Global monitoring locations",
        "Detailed uptime reports",
        "Easy setup & management",
        "24/7 reliability"
      ]
    ]
  },
  {
    icon: Target,
    title: "Our Commitment",
    content: `We're committed to providing reliable, accurate monitoring that you can trust. Our team continuously works to improve our service, add new features, and ensure your websites are monitored with the highest precision possible.`
  }
];
