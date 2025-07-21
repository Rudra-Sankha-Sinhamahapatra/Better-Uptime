"use client"

import { HeroGradient } from "@/components/ui/HeroGradient";

export default function DisclaimerPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 py-24">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-4xl">

        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          Important Notice for Website Monitoring
        </h1>
        
        <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">
            ⚠️ DDoS Protection & Monitoring Compatibility
          </h2>
          
          <div className="text-left space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">🚫 Please Disable DDoS Protection Services</h3>
              <p className="mb-3">
                To ensure accurate website monitoring, please <strong className="text-green-400">disable any DDoS protection services</strong> on your websites, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Vercel DDoS Protection</strong> - Turn off in your Vercel dashboard settings</li>
                <li><strong>Cloudflare Bot Fight Mode</strong> - Disable in Cloudflare security settings</li>
                <li><strong>AWS Shield Advanced</strong> - Configure to allow monitoring requests</li>
                <li><strong>CDN-based protection</strong> - Whitelist our monitoring IPs</li>
                <li><strong>Rate limiting services</strong> - Adjust thresholds to accommodate monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">🔍 Why This Matters</h3>
              <p className="mb-3">
                Our monitoring system works by sending regular HTTP requests to your website to check its availability and response time. 
                DDoS protection services often block or rate-limit these automated requests, which can result in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>False downtime alerts when your site is actually online</li>
                <li>Inaccurate response time measurements</li>
                <li>Monitoring requests being blocked entirely</li>
                <li>Inability to detect real outages</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">✅ Recommended Actions</h3>
              <div className="space-y-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-semibold text-green-400 mb-2">For Vercel Users:</p>
                  <p>Go to your project settings → Security → DDoS Protection and disable it for websites you want to monitor.</p>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="font-semibold text-blue-400 mb-2">For Cloudflare Users:</p>
                  <p>Navigate to Security → Bots → Configure Bot Fight Mode and set it to "Off" or create custom rules to allow monitoring traffic.</p>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-semibold text-purple-400 mb-2">Alternative Solution:</p>
                  <p>If you must keep DDoS protection enabled, contact our support team to whitelist our monitoring IP addresses in your protection service.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">📋 Before Adding Your Website</h3>
              <p className="mb-3">
                Please ensure that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your website responds to HTTP/HTTPS requests without captchas</li>
                <li>No aggressive rate limiting is in place for automated requests</li>
                <li>Bot protection services are configured to allow monitoring</li>
                <li>Your hosting provider allows external monitoring services</li>
                <li>CORS policies don't block our monitoring requests</li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-amber-400 mb-3">💡 Need Help?</h3>
              <p>
                If you're unsure about your current DDoS protection settings or need assistance configuring your website for monitoring, 
                please contact our support team. We're here to help ensure accurate monitoring of your websites.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 text-gray-400 hover:text-white transition-colors border border-green-500/20 rounded rounded-full"
          >
            Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/websites'}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
          >
            I Understand - Add My Website
          </button>
        </div>
      </div>
    </div>
  );
} 