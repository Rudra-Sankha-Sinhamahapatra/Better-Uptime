"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { config } from "@/utils/config";
import type { Website } from "@/types/website";
import type { WebsiteTick } from "@/types/tick";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";
import { WebsitesGradient } from "@/components/ui/WebsitesGradient";
import { motion } from "framer-motion";
import type { TimePeriod, StatusTooltipProps, LineTooltipProps } from "@/types/websiteStatus";
import { useSession } from "@/context/session-context";

const TIME_PERIODS: Record<TimePeriod, { hours: number; label: string }> = {
  "24h": { hours: 24, label: "24h" },
  "7d": { hours: 168, label: "7d" },
  "30d": { hours: 720, label: "30d" }, 
};

function formatTime(ts: string, period: TimePeriod): string {
  const d = new Date(ts);
  
  if (period === "24h") {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}

function statusColor(status: WebsiteTick["status"]): string {
  if (status === "Up") return "#22c55e";
  if (status === "Down") return "#ef4444";
  return "#9ca3af";
}

function StatusTooltip({ active, payload, period }: StatusTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  
  if (!p || !p.fullTime) return null;
  
  const timeDisplay = new Date(p.fullTime).toLocaleString();
  const status = p.status;
  const statusClass = status === "Up" ? "text-green-400" : status === "Down" ? "text-red-400" : "text-gray-300";
  
  return (
    <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-black via-green-600/20 to-green/60 px-3 py-2 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <div className="text-white text-sm mb-1">{timeDisplay}</div>
      <div className="text-sm text-gray-300">
        Status: <span className={statusClass}>{status}</span>
      </div>
    </div>
  );
}

function LineTooltip({ active, payload, period }: LineTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload;
  
  if (!p || !p.fullTime) return null;
  
  const timeDisplay = new Date(p.fullTime).toLocaleString();
  
  return (
    <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-black via-green-600/20 to-black px-3 py-2 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <div className="text-white text-sm mb-1">{timeDisplay}</div>
      <div className="text-sm text-green-300">Response: {p.ms} ms</div>
    </div>
  );
}

function CustomSelect({ 
  value, 
  onChange, 
  options 
}: { 
  value: TimePeriod; 
  onChange: (value: TimePeriod) => void; 
  options: { value: TimePeriod; label: string }[] 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.div
        className="absolute inset-0 opacity-30 rounded-xl"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.1) 25%, transparent 50%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-full bg-gradient-to-br from-black/80 via-green-900/20 to-black/80 border border-gray-700/50 rounded-xl px-4 py-3 text-white text-sm font-medium backdrop-blur-sm hover:border-green-500/60 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/60 transition-all duration-200 cursor-pointer min-w-[140px] shadow-lg flex items-center justify-between"
      >
        <span>Last {TIME_PERIODS[value].label}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 20 20"
        >
          <path stroke="#22c55e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gradient-to-br from-black/95 via-green-900/20 to-black/95 border border-gray-700/50 rounded-xl shadow-xl backdrop-blur-sm z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm text-white hover:bg-gradient-to-r hover:from-green-900/50 hover:via-green-800/40 hover:to-green-900/50 transition-all duration-200 flex items-center justify-between group ${
                value === option.value ? 'text-green-300' : ''
              }`}
            >
              <span className="flex-1">{option.label}</span>
              {value === option.value && (
                <svg 
                  className="w-4 h-4 text-green-400 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              )}
              {value !== option.value && (
                <div className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-30 transition-opacity duration-200">
                  <svg 
                    className="w-4 h-4 text-green-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WebsiteDetailPage() {
  const params = useParams<{ websiteId: string }>();
  const websiteId = params.websiteId;
  const { session, loading: sessionLoading } = useSession();

  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<Website | null>(null);
  const [ticks, setTicks] = useState<WebsiteTick[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("24h");

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
      ticks.map((t, index) => ({
        time: formatTime(t.createdAt, selectedPeriod),
        fullTime: t.createdAt,
        ms: t.response_time_ms,
        index,
        tickId: t.id,
        uniqueKey: `${formatTime(t.createdAt, selectedPeriod)}-${index}`,
      })),
    [ticks, selectedPeriod]
  );

  const statusData = useMemo(
    () =>
      ticks.map((t, index) => ({
        idx: index, 
        time: formatTime(t.createdAt, selectedPeriod),
        fullTime: t.createdAt,
        value: t.status === "Up" ? 1 : t.status === "Down" ? -1 : 0,
        fill: statusColor(t.status),
        status: t.status,
        index,
        tickId: t.id,
        uniqueKey: `${formatTime(t.createdAt, selectedPeriod)}-${index}`,
      })),
    [ticks, selectedPeriod]
  );

  const fetchData = async (period: TimePeriod = selectedPeriod) => {
    if (!session?.session?.token) {
      setError("No session token");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session.session?.token) {
        headers.Authorization = `Bearer ${session.session.token}`;
      }

      const hours = TIME_PERIODS[period].hours;
      const [websiteRes, ticksRes] = await Promise.all([
        fetch(`${config.backendUrl}/website/${websiteId}`, { headers }),
        fetch(`${config.backendUrl}/website/${websiteId}/ticks?hours=${hours}`, { headers }),
      ]);

      if (!websiteRes.ok) throw new Error("Failed to load website");
      if (!ticksRes.ok) throw new Error("Failed to load ticks");

      const websiteData = await websiteRes.json();
      const ticksData = await ticksRes.json();

      setWebsite(websiteData);
      setTicks(ticksData.ticks || []);
    } catch (e: unknown) {
      setError((e as Error).message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (websiteId && !sessionLoading && session) {
      fetchData(selectedPeriod);
      if (selectedPeriod === "24h") {
        const interval = setInterval(() => fetchData(selectedPeriod), 60_000);
        return () => clearInterval(interval);
      }
    }
  }, [websiteId, selectedPeriod, session, sessionLoading]);

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  if (sessionLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-24 px-6 text-center text-red-400">
        Please sign in to view this page
      </div>
    );
  }

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

  const getXAxisInterval = (data: any[], period: TimePeriod) => {
    if (period === "24h") {
      return data.length > 24 ? Math.floor(data.length / 12) : "preserveStart";
    } else if (period === "7d") {
      const uniqueDates = new Set(data.map(d => d.time));
      const numUniqueDates = uniqueDates.size;
      if (numUniqueDates <= 7) {
        const ticksPerDay = Math.ceil(data.length / numUniqueDates);
        return Math.max(1, Math.floor(ticksPerDay / 2));
      }
      return Math.max(1, Math.floor(data.length / 7));
    } else {
      const uniqueDates = new Set(data.map(d => d.time));
      const numUniqueDates = uniqueDates.size;
      if (numUniqueDates <= 15) {
        const ticksPerDay = Math.ceil(data.length / numUniqueDates);
        return Math.max(1, Math.floor(ticksPerDay / 2));
      }
      return Math.max(1, Math.floor(data.length / 6));
    }
  };

  const getBarSize = (dataLength: number, period: TimePeriod) => {
    if (period === "24h") {
      return Math.max(2, Math.min(8, 400 / dataLength));
    } else if (period === "7d") {
      return Math.max(1, Math.min(6, 600 / dataLength));
    } else {
      return Math.max(1, Math.min(4, 800 / dataLength));
    }
  };

  const getTickFormatter = (data: any[], period: TimePeriod) => {
    if (period === "24h") return undefined;
    
    // For 7d and 30d, we want to show date labels at smart intervals
    // but not hide all duplicates - just space them out nicely
    const seenDates = new Map<string, number>();
    
    return (value: string, index: number) => {
      if (seenDates.has(value)) {
        // If we've seen this date before, only show it occasionally to avoid crowding
        const firstIndex = seenDates.get(value)!;
        const spacing = period === "7d" ? 6 : 12; // Show every 6th for 7d, every 12th for 30d
        if (index - firstIndex < spacing) {
          return "";
        }
      } else {
        seenDates.set(value, index);
      }
      return value;
    };
  };

  return (
    <div className="relative min-h-screen bg-black">
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

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <div className="relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-500/40">
              <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="text-gray-400 text-sm">Uptime ({TIME_PERIODS[selectedPeriod].label})</div>
                <div className="text-3xl font-semibold text-white">{metrics.upPct}%</div>
              </div>
            </div>
            <div className="relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-500/40">
              <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                  background: [
                    "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="text-gray-400 text-sm">Avg Response</div>
                <div className="text-3xl font-semibold text-white">{metrics.avgMs} ms</div>
              </div>
            </div>
            <div className="relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-500/40">
              <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 50%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, transparent 0%, rgb(34 197 94 / 0.08) 25%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="text-gray-400 text-sm">P95 Response</div>
                <div className="text-3xl font-semibold text-white">{metrics.p95Ms} ms</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-auto w-full flex justify-center lg:justify-end">
            <CustomSelect
              value={selectedPeriod}
              onChange={handlePeriodChange}
              options={[
                { value: "24h", label: "Last 24h" },
                { value: "7d", label: "Last 7d" },
                { value: "30d", label: "Last 30d" }
              ]}
            />
          </div>
        </div>

        <div className={`grid gap-8 ${selectedPeriod === "24h" ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1"}`}>
          <div className={`${selectedPeriod === "24h" ? "lg:col-span-3" : ""} relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:border-green-500/40`}>
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
              <h2 className="text-xl font-semibold text-white">Response Time (last {TIME_PERIODS[selectedPeriod].label})</h2>
              <div className="text-gray-500 text-sm">ms</div>
            </div>
            <div className={`${selectedPeriod === "24h" ? "h-72" : "h-80"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 20, bottom: selectedPeriod === "30d" ? 60 : selectedPeriod === "7d" ? 30 : 10, left: selectedPeriod === "30d" ? 25 : selectedPeriod === "7d" ? 15 : 0 }}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="uniqueKey"
                    tick={{ fill: "#9ca3af", fontSize: selectedPeriod === "24h" ? 12 : 11 }} 
                    interval={getXAxisInterval(lineData, selectedPeriod)}
                    axisLine={{ stroke: "#374151" }}
                    tickLine={{ stroke: "#374151" }}
                    angle={selectedPeriod === "30d" ? -45 : 0}
                    textAnchor={selectedPeriod === "30d" ? "end" : "middle"}
                    height={selectedPeriod === "30d" ? 60 : 30}
                    tickFormatter={(value, index) => {
                      const timeLabel = value.split('-')[0];
                      const formatter = getTickFormatter(lineData, selectedPeriod);
                      return formatter ? formatter(timeLabel, index) : timeLabel;
                    }}
                  />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip
                    content={<LineTooltip period={selectedPeriod} />}
                    cursor={{ stroke: "#22c55e", strokeWidth: 1, strokeDasharray: "3 3", opacity: 0.6 }}
                    allowEscapeViewBox={{ x: false, y: false }}
                  />
                  <Line type="monotone" dataKey="ms" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`${selectedPeriod === "24h" ? "lg:col-span-2" : ""} relative overflow-hidden group bg-black/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:border-green-500/40`}>
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
              <h2 className="text-xl font-semibold text-white">Status Timeline (last {TIME_PERIODS[selectedPeriod].label})</h2>
              <div className="text-gray-500 text-sm">Up/Down</div>
            </div>
            <div className={`${selectedPeriod === "24h" ? "h-72" : "h-80"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={statusData} 
                  margin={{ top: 10, right: 20, bottom: selectedPeriod === "30d" ? 60 : selectedPeriod === "7d" ? 30 : 10, left: selectedPeriod === "30d" ? 25 : selectedPeriod === "7d" ? 15 : 0 }}
                  barCategoryGap={1}
                >
                  <XAxis 
                    dataKey="uniqueKey"
                    tick={{ fill: "#9ca3af", fontSize: selectedPeriod === "24h" ? 12 : 11 }}
                    interval={getXAxisInterval(statusData, selectedPeriod)}
                    axisLine={{ stroke: "#374151" }}
                    tickLine={{ stroke: "#374151" }}
                    angle={selectedPeriod === "30d" ? -45 : 0}
                    textAnchor={selectedPeriod === "30d" ? "end" : "middle"}
                    height={selectedPeriod === "30d" ? 60 : 30}
                    tickFormatter={(value, index) => {
                      // Extract the time part from uniqueKey (format: "time-index")
                      const timeLabel = value.split('-')[0];
                      const formatter = getTickFormatter(statusData, selectedPeriod);
                      return formatter ? formatter(timeLabel, index) : timeLabel;
                    }}
                  />
                  <YAxis hide />
                  <Tooltip
                    content={<StatusTooltip period={selectedPeriod} />}
                    cursor={{ fill: "rgba(34, 197, 94, 0.08)" }}
                    allowEscapeViewBox={{ x: false, y: false }}
                  />
                  <Bar 
                    dataKey="value" 
                    maxBarSize={getBarSize(statusData.length, selectedPeriod)}
                  >
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-${entry.tickId}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}