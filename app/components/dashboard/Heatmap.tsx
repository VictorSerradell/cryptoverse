"use client";
import { TOP_50_IDS } from "@/app/lib/constants";
import { fmtPct } from "@/app/lib/formatters";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { motion } from "framer-motion";

export function Heatmap() {
  const coins = useCryptoStore((s) => s.coins);
  const cells = TOP_50_IDS.map((id) => coins[id])
    .filter(Boolean)
    .slice(0, 50);

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
          🗺️ Market Heatmap — Top 50
        </span>
        <span className="text-xs font-mono text-slate-600">
          by 24h performance
        </span>
      </div>

      <div
        className="grid gap-0.5 p-4"
        style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
      >
        {cells.map((coin, i) => {
          const chg = coin.price_change_percentage_24h ?? 0;
          const intensity = Math.min(Math.abs(chg) / 15, 1);
          const bg =
            chg > 0
              ? `rgba(16,185,129,${0.2 + intensity * 0.7})`
              : `rgba(239,68,68,${0.2 + intensity * 0.7})`;

          return (
            <motion.div
              key={coin.id}
              className="aspect-square rounded flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group"
              style={{ background: bg }}
              title={`${coin.name}: ${fmtPct(chg)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
            >
              <span className="text-[0.42rem] font-mono font-bold text-white/90 text-center leading-tight px-0.5">
                {coin.symbol?.toUpperCase()}
              </span>
              <span className="text-[0.38rem] font-mono text-white/80">
                {fmtPct(chg)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
