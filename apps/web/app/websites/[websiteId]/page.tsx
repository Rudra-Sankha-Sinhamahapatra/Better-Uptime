"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { config } from "@/utils/config";
import { authClient } from "@/lib/auth-client";
import type { Website } from "@/types/website";
import type { WebsiteTick } from "@/types/tick";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";
import { WebsitesGradient } from "@/components/ui/WebsitesGradient";
import { motion } from "framer-motion";

function formatTime(ts: string) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function statusColor(status: WebsiteTick["status"]) {
  if (status === "Up") return "#22c55e";
  if (status === "Down") return "#ef4444";
  return "#9ca3af";
}

function StatusTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  const isUp = p?.value === 1;
  const isDown = p?.value === -1;
  const statusText = isUp ? "Up" : isDown ? "Down" : "Unknown";
  const statusClass = isUp ? "text-green-400" : isDown ? "text-red-400" : "text-gray-300";
  return (
    <div className="rounded-lg border border-green-500/30  bg-gradient-to-br from-black via-green-600/20 to-green/60 px-3 py-2 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <div className="text-white text-sm mb-1">{p?.time}</div>
      <div className="text-sm text-gray-300">
        Status: <span className={statusClass}>{statusText}</span>
      </div>
    </div>
  );
}

function LineTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  return (
    <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-black via-green-600/20 to-black px-3 py-2 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <div className="text-white text-sm mb-1">{p?.time}</div>
      <div className="text-sm text-green-300">Response: {p?.ms} ms</div>
    </div>
  );
}

export default function WebsiteDetailPage() {
  const params = useParams<{ websiteId: string }>();
  const websiteId = params.websiteId;

  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<Website | null>(null);
  const [ticks, setTicks] = useState<WebsiteTick[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await authClient.getSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session.data?.session?.token) {
        headers.Authorization = `Bearer ${session.data.session.token}`;
      }

      const [websiteRes, ticksRes] = await Promise.all([
        fetch(`${config.backendUrl}/website/${websiteId}`, { headers }),
        fetch(`${config.backendUrl}/website/${websiteId}/ticks?hours=24`, { headers }),
      ]);

      if (!websiteRes.ok) throw new Error("Failed to load website");
      if (!ticksRes.ok) throw new Error("Failed to load ticks");

      const websiteData = await websiteRes.json();
      const ticksData = await ticksRes.json();

      setWebsite(websiteData);
      setTicks(ticksData.ticks || []);
    } catch (e: any) {
      setError(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (websiteId) {
      fetchData();
      const interval = setInterval(fetchData, 60_000); // refresh every minute
      return () => clearInterval(interval);
    }
  }, [websiteId]);

  const metrics = useMemo(() => {
    if (!ticks.length) return { avgMs: 0, p95Ms: 0, upPct: 0 };
    const times = ticks.map(t => t.response_time_ms).filter(Boolean);
    const avgMs = Math.round(times.reduce((a, b) => a + b, 0) / Math.max(times.length, 1));
    const sorted = [...times].sort((a, b) => a - b);
    const p95Ms = sorted.length ? sorted[Math.floor(sorted.length * 0.95) - 1] ?? sorted[sorted.length - 1] : 0;
    const upPct = Math.round((ticks.filter(t => t.status === "Up").length / ticks.length) * 100);
    return { avgMs, p95Ms, upPct };
  }, [ticks]);

  const lineData = useMemo(
    () =>
      ticks.map(t => ({
        time: formatTime(t.createdAt),
        ms: t.response_time_ms,
      })),
    [ticks]
  );

  const statusData = useMemo(
    () =>
      ticks.map((t, i) => ({
        idx: i, 
        time: formatTime(t.createdAt),
        value: t.status === "Up" ? 1 : t.status === "Down" ? -1 : 0,
        fill: statusColor(t.status),
      })),
    [ticks]
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen pt-24 px-6 text-center text-red-400">
        {error || "Website not found"}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-20 bg-black">
      <WebsitesGradient />
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, rgba(34,197,94,0.08) 0%, transparent 40%)",
            "radial-gradient(circle at 80% 30%, rgba(34,197,94,0.08) 0%, transparent 40%)",
            "radial-gradient(circle at 30% 80%, rgba(34,197,94,0.08) 0%, transparent 40%)",
            "radial-gradient(circle at 60% 10%, rgba(34,197,94,0.08) 0%, transparent 40%)",
            "radial-gradient(circle at 10% 20%, rgba(34,197,94,0.08) 0%, transparent 40%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
            {website.name}
          </h1>
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 break-all"
          >
            {website.url}
          </a>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                website.latestTick?.status === "Up"
                  ? "bg-green-500/15 text-green-400 border-green-500/30"
                  : website.latestTick?.status === "Down"
                  ? "bg-red-500/15 text-red-400 border-red-500/30"
                  : "bg-gray-500/15 text-gray-300 border-gray-500/30"
              }`}
            >
              {website.latestTick?.status || "Unknown"}
            </span>
            <span className="text-gray-400 text-sm">
              Last check: {website.latestTick ? new Date(website.latestTick.createdAt).toLocaleString() : "Never"}
            </span>
            <span className="text-gray-400 text-sm">
              Response: {website.latestTick?.response_time_ms ?? "-"} ms
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-gray-400 text-sm">Uptime (24h)</div>
            <div className="text-3xl font-semibold text-white">{metrics.upPct}%</div>
          </div>
          <div className="bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-gray-400 text-sm">Avg Response</div>
            <div className="text-3xl font-semibold text-white">{metrics.avgMs} ms</div>
          </div>
          <div className="bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-gray-400 text-sm">P95 Response</div>
            <div className="text-3xl font-semibold text-white">{metrics.p95Ms} ms</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:border-green-500/40">
            <motion.div
              className="absolute inset-0 opacity-50"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Response Time (last 24h)</h2>
              <div className="text-gray-500 text-sm">ms</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip
                    content={<LineTooltip />}
                    cursor={{ stroke: "#22c55e", strokeWidth: 1, strokeDasharray: "3 3", opacity: 0.6 }}
                  />
                  <Line type="monotone" dataKey="ms" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:border-green-500/40">
            <motion.div
              className="absolute inset-0 opacity-50"
              animate={{
                background: [
                  "radial-gradient(circle at 80% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 20% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  "radial-gradient(circle at 80% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Status Timeline (last 24h)</h2>
              <div className="text-gray-500 text-sm">Up/Down</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <XAxis dataKey="time" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip
                    content={<StatusTooltip />}
                    cursor={{ fill: "rgba(34, 197, 94, 0.08)" }}
                  />
                  <Bar dataKey="value">
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 justify-center">
          <button className="px-4 py-2 rounded-full border border-green-500/30 text-white bg-green-600/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]">24h</button>
          <button disabled className="px-4 py-2 rounded-full border border-gray-800 text-gray-500 cursor-not-allowed">7d (soon)</button>
          <button disabled className="px-4 py-2 rounded-full border border-gray-800 text-gray-500 cursor-not-allowed">30d (soon)</button>
        </div>
      </div>
    </div>
  );
}