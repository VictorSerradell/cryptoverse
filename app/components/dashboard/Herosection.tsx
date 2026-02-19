"use client";

import { PORTFOLIO_HOLDINGS } from "@/app/lib/constants";
import { fmt, fmtPct } from "@/app/lib/formatters";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { motion } from "framer-motion";
import { OrbCanvas } from "../three/Orbcanvas";

export function HeroSection() {
  const coins = useCryptoStore((s) => s.coins);

  const { total, change24h, change24hPct } = PORTFOLIO_HOLDINGS.reduce(
    (acc, h) => {
      const coin = coins[h.id];
      if (!coin) return acc;
      const value = coin.current_price * h.amount;
      const prev = value / (1 + coin.price_change_percentage_24h / 100);
      acc.total += value;
      acc.change24h += value - prev;
      return acc;
    },
    { total: 0, change24h: 0, change24hPct: 0 },
  );

  const pct24h = total > 0 ? (change24h / (total - change24h)) * 100 : 0;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-center min-h-[320px]">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-px bg-indigo-500" />
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
            Total Portfolio Value
          </span>
        </div>

        <div
          className="text-neon font-bold tracking-tight leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
        >
          ${fmt(total)}
        </div>

        <div className="flex gap-8 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-mono text-slate-500 uppercase tracking-wider">
              24h Change
            </span>
            <span
              className={`text-lg font-semibold tabular-nums ${change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {change24h >= 0 ? "+" : ""}${fmt(Math.abs(change24h))} (
              {fmtPct(pct24h)})
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-mono text-slate-500 uppercase tracking-wider">
              Assets
            </span>
            <span className="text-lg font-semibold text-slate-200">
              {PORTFOLIO_HOLDINGS.length} coins
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-mono text-slate-500 uppercase tracking-wider">
              All-Time PnL
            </span>
            <span className="text-lg font-semibold text-emerald-400">
              +$142,000 (+99.4%)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Orb */}
      <motion.div
        className="flex items-center justify-center h-[320px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <OrbCanvas />
      </motion.div>
    </section>
  );
}
