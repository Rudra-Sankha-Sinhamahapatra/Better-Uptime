"use client"
import { HeroGradient } from "@/components/ui/HeroGradient";
import { Zap, Lightbulb, Mail, Clock, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { config } from "@/utils/config";

type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    queryType: "General Inquiry",
    query: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    // Check if user is logged in and prefill form
    const checkUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session.data?.session) {
          setUser(session.data.user);
          setFormData(prev => ({
            ...prev,
            name: session.data.user.name || "",
            email: session.data.user.email || ""
          }));
        }
      } catch (error) {
        console.log("User not logged in");
      }
    };
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const session = await authClient.getSession();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (session.data?.session) {
        headers["Authorization"] = `Bearer ${session.data.session.token}`;
      }

      const response = await fetch(`${config.backendUrl}/contact`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit contact form");
      }

      setSubmitted(true);
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        queryType: "General Inquiry",
        query: ""
      });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      setError(error.message || "Failed to submit contact form");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 py-24">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-4xl">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl mb-12 text-gray-300">
          Have questions, need support, or want to share feedback? We'd love to hear from you.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form - Matching AddWebsite styling */}
          <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-sm relative">
            <h2 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h2>
            
            {user && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-400">
                  ✅ Logged in as {user.name || user.email}
                </p>
              </div>
            )}

            {submitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 font-medium">
                  ✅ Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 font-medium">
                  ❌ {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50"
                  placeholder="Your name"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50"
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Subject</label>
                <select 
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50"
                  disabled={loading}
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea 
                  rows={5}
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                  disabled={loading}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Mail className="w-5 h-5 text-white" />
                Direct Contact
              </h3>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-gray-400">General Inquiries:</p>
                  <p className="text-white font-medium">hello@betteruptime.com</p>
                </div>
                <div>
                  <p className="text-gray-400">Technical Support:</p>
                  <p className="text-white font-medium">support@betteruptime.com</p>
                </div>
                <div>
                  <p className="text-gray-400">Enterprise Sales:</p>
                  <p className="text-white font-medium">sales@betteruptime.com</p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Clock className="w-5 h-5 text-white" />
                Support Hours
              </h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday:</span>
                  <span className="text-white">9:00 AM - 6:00 PM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday:</span>
                  <span className="text-white">10:00 AM - 4:00 PM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday:</span>
                  <span className="text-white">Closed</span>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  * Emergency support available 24/7 for Enterprise customers
                </p>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-3">
              <Zap className="w-5 h-5 text-white" />
              Quick Support
            </h3>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-gray-400 mb-2">Need immediate help?</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-300">
                    Open Live Chat
                  </button>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Check our knowledge base:</p>
                  <button className="w-full rounded rounded-full px-4 py-2 text-gray-400 hover:text-white transition-colors border  border-green-500/20">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Globe className="w-5 h-5 text-white" />
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://x.com/RudraSankha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-500/30 via-green-600/20 to-green-700/30 text-white py-3 rounded-lg font-medium hover:from-green-500/40 hover:via-green-600/30 hover:to-green-700/40 transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                <a 
                  href="https://www.linkedin.com/in/rudra-sankha-sinhamahapatra-6311aa1bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-500/30 via-green-600/20 to-green-700/30 text-white py-3 rounded-lg font-medium hover:from-green-500/40 hover:via-green-600/30 hover:to-green-700/40 transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/Rudra-Sankha-Sinhamahapatra/Better-Uptime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-500/30 via-green-600/20 to-green-700/30 text-white py-3 rounded-lg font-medium hover:from-green-500/40 hover:via-green-600/30 hover:to-green-700/40 transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
          <h3 className="text-xl font-semibold mb-3 text-green-400 flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-white" />
            Frequently Asked Questions
          </h3>
          <p className="text-gray-400 mb-4">
            Before reaching out, you might find your answer in our comprehensive FAQ section.
          </p>
          <button 
            onClick={() => window.location.href = '/pricing'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
          >
            View FAQ
          </button>
        </div>
      </div>
    </div>
  );
} 