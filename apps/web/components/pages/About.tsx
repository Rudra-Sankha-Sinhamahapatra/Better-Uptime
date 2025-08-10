"use client"
import { HeroGradient } from "@/components/ui/HeroGradient";
import { Rocket, Lightbulb, Settings, Star, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 pt-12 pb-24">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-4xl">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          About BetterUptime
        </h1>
        
        {/* Main Content */}
        <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 mb-8 border border-gray-800/50">
          <div className="text-left space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Rocket className="w-6 h-6 text-white" />
                Our Mission
              </h2>
              <p className="text-lg text-white">
                At BetterUptime, we believe every business deserves reliable website monitoring that's both powerful and affordable. 
                We're dedicated to providing real-time insights into your website's performance, helping you maintain exceptional uptime 
                and deliver the best experience to your users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-white" />
                Why We Built This
              </h2>
              <p className="mb-4 text-white">
                Website downtime can cost businesses thousands of dollars and damage customer trust. Traditional monitoring solutions 
                are often expensive, complex, or lack the features you actually need. We created BetterUptime to solve these problems:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>Simple, intuitive interface that anyone can use</li>
                <li>Real-time monitoring with instant notifications</li>
                <li>Affordable pricing for businesses of all sizes</li>
                <li>Detailed analytics and performance insights</li>
                <li>Reliable alert system via email and SMS</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Settings className="w-6 h-6 text-white" />
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/40 border border-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">1. Monitor</h3>
                  <p className="text-sm text-gray-400">We continuously check your websites from multiple locations worldwide</p>
                </div>
                <div className="bg-black/40 border border-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">2. Detect</h3>
                  <p className="text-sm text-gray-400">Instantly identify downtime, slow responses, or errors on your sites</p>
                </div>
                <div className="bg-black/40 border border-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">3. Alert</h3>
                  <p className="text-sm text-gray-400">Get notified immediately via email, SMS, or your preferred channels</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Star className="w-6 h-6 text-white" />
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Real-time website monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Instant downtime alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Performance analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Multiple notification channels</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Global monitoring locations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Detailed uptime reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">Easy setup & management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white">24/7 reliability</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-black/40 border border-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Target className="w-6 h-6 text-white" />
                Our Commitment
              </h2>
              <p className="text-white">
                We're committed to providing reliable, accurate monitoring that you can trust. Our team continuously works to improve 
                our service, add new features, and ensure your websites are monitored with the highest precision possible.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => window.location.href = '/websites'}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
          >
            Start Monitoring Your Websites
          </button>
        </div>
      </div>
    </div>
  );
} 