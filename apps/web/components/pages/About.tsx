"use client";
import { HeroGradient } from "@/components/ui/HeroGradient";
import { aboutSections } from "@/utils/data/aboutData";

export default function AboutPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 pt-12 pb-24">
      <HeroGradient />

      <div className="relative z-10 text-white text-center max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          About BetterUptime
        </h1>

        <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 mb-8 border border-gray-800/50 text-left space-y-10 text-gray-300 leading-relaxed">
          {aboutSections.map(({ icon: Icon, title, content, list, steps, features }, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
                <Icon className="w-6 h-6 text-white" />
                {title}
              </h2>

              {content && <p className="text-lg text-white mb-4">{content}</p>}

              {list && (
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                  {list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}

              {steps && (
                <div className="grid md:grid-cols-3 gap-6">
                  {steps.map((s, i) => (
                    <div key={i} className="bg-black/40 border border-gray-800/50 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-400">{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {features && (
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((col, i) => (
                    <ul key={i} className="space-y-2">
                      {col.map((f, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="text-green-400">✓</span>
                          <span className="text-white">{f}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/websites")}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
          >
            Start Monitoring Your Websites
          </button>
        </div>
      </div>
    </div>
  );
}
