"use client";
import { TOP_50_IDS } from "@/app/lib/constants";
import { fmt, fmtUSD } from "@/app/lib/formatters";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { motion } from "framer-motion";

export function QuickStats() {
  const coins = useCryptoStore((s) => s.coins);
  const fearGreed = useCryptoStore((s) => s.fearGreed);

  const tracked = TOP_50_IDS.map((id) => coins[id]).filter(Boolean);
  const totalMcap = tracked.reduce((s, c) => s + (c.market_cap ?? 0), 0);
  const btcDom =
    totalMcap > 0 ? ((coins["bitcoin"]?.market_cap ?? 0) / totalMcap) * 100 : 0;
  const ethDom =
    totalMcap > 0
      ? ((coins["ethereum"]?.market_cap ?? 0) / totalMcap) * 100
      : 0;

  const fgVal = fearGreed?.value ?? 72;
  const fgLabel = fearGreed?.label ?? "Greed";
  const fgColor =
    fgVal >= 60
      ? "text-emerald-400"
      : fgVal >= 40
        ? "text-amber-400"
        : "text-red-400";

  const stats = [
    {
      label: "🌐 Global Market Cap",
      value: fmtUSD(totalMcap),
      sub: `${fmt(coins["bitcoin"]?.price_change_percentage_24h ?? 0)}% BTC 24h`,
      color: "text-slate-100",
    },
    {
      label: "₿ BTC Dominance",
      value: `${fmt(btcDom, 1)}%`,
      sub: "of total market",
      color: "text-amber-400",
    },
    {
      label: "Ξ ETH Dominance",
      value: `${fmt(ethDom, 1)}%`,
      sub: "of total market",
      color: "text-violet-400",
    },
    {
      label: "😨 Fear & Greed",
      value: String(fgVal),
      sub: fgLabel,
      color: fgColor,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="glass rounded-xl p-5 relative overflow-hidden group cursor-default"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Bottom glow bar on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500
                          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          />

          <div className="text-[0.68rem] font-mono text-slate-500 uppercase tracking-widest mb-2">
            {s.label}
          </div>
          <div
            className={`text-2xl font-bold tabular-nums tracking-tight mb-1 ${s.color}`}
          >
            {s.value}
          </div>
          <div className="text-xs font-mono text-slate-500">{s.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}
