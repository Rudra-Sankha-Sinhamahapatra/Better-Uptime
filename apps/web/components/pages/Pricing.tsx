"use client"

import { HeroGradient } from "@/components/ui/HeroGradient";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 py-20">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-6xl">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
          Choose the plan that fits your needs. All plans include real-time monitoring, instant alerts, and detailed analytics.
        </p>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Starter Plan */}
          <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border border-gray-800/50 hover:border-green-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-400">$0</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Monitor up to 5 websites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">5-minute check intervals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Email notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Basic uptime reports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Community support</span>
              </li>
            </ul>
            <button className="w-full px-4 py-3 text-gray-400 hover:text-white transition-colors rounded rounded-full border border-green-500/20">
              Get Started Free
            </button>
          </div>

          {/* Pro Plan - Featured */}
          <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border-2 border-green-500/50 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-400">$19</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Monitor up to 50 websites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">1-minute check intervals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Email & SMS notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Multiple monitoring locations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Priority support</span>
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300">
              Start Pro Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border border-gray-800/50 hover:border-green-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Enterprise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-400">$99</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Unlimited websites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">30-second check intervals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">All notification channels</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Custom integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Global monitoring network</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white">Dedicated support</span>
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border border-gray-800/50">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">Frequently Asked Questions</h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Do you offer a free trial?</h3>
              <p className="text-gray-400">Our Starter plan is completely free forever. Pro and Enterprise plans come with a 14-day free trial.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Is there a setup fee?</h3>
              <p className="text-gray-400">No setup fees, no hidden costs. You only pay for what you use.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Ready to get started?</h2>
          <p className="text-gray-400 mb-6">Join thousands of businesses monitoring their websites with BetterUptime</p>
          <button 
            onClick={() => window.location.href = '/websites'}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
          >
            Start Monitoring Now
          </button>
        </div>
      </div>
    </div>
  );
} 