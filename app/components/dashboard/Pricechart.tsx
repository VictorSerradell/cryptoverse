"use client";
import { useState } from "react";
import { priceStr } from "@/app/lib/formatters";
import { COIN_SELECTOR, TIMEFRAMES } from "@/app/lib/constants";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { usePriceHistory } from "@/app/hooks/Usecryptodata";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-4 py-3 border border-indigo-500/30 shadow-neon">
      <div className="text-xs font-mono text-slate-400 mb-1">{label}</div>
      <div className="text-base font-bold font-mono">
        {priceStr(payload[0].value)}
      </div>
    </div>
  );
}

export function PriceChart() {
  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(7);

  const { data, isLoading } = usePriceHistory(coin, days);

  const prices: { label: string; price: number }[] = (data?.prices ?? []).map(
    ([ts, price]: [number, number]) => ({
      label:
        days <= 1
          ? new Date(ts).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date(ts).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
      price,
    }),
  );

  const first = prices[0]?.price ?? 0;
  const last = prices[prices.length - 1]?.price ?? 0;
  const isUp = last >= first;
  const color = isUp ? "#10b981" : "#ef4444";

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
          📈 Market Chart
        </span>
        <div className="flex gap-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.days}
              onClick={() => setDays(tf.days)}
              className={`px-2 py-1 rounded text-xs font-mono font-semibold transition-all
                ${
                  days === tf.days
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-neon"
                    : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.06]"
                }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Coin selector */}
        <div className="flex gap-2 mb-4">
          {COIN_SELECTOR.map((c) => (
            <button
              key={c.id}
              onClick={() => setCoin(c.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all
                ${
                  coin === c.id
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-neon"
                    : "text-slate-500 hover:text-slate-200 glass"
                }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-[280px] min-h-[280px] w-full">
          {isLoading ? (
            <div className="h-full shimmer rounded-xl" />
          ) : (
            <motion.div
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height="100%" minHeight={280}>
                <AreaChart
                  data={prices}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{
                      fill: "#475569",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                    }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    orientation="right"
                    tick={{
                      fill: "#475569",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                    }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={priceStr}
                    width={70}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={color}
                    strokeWidth={2}
                    fill="url(#chartGrad)"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
