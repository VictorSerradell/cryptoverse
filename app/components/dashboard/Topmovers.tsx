"use client";
import { priceStr, fmtPct, fmtUSD } from "@/app/lib/formatters";
import { generateSparkSvg } from "@/app/lib/utils";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { motion } from "framer-motion";
import Image from "next/image";

export function TopMovers() {
  const coins = useCryptoStore((s) => s.coins);

  const sorted = Object.values(coins)
    .filter((c) => c.current_price && c.price_change_percentage_24h != null)
    .sort(
      (a, b) =>
        Math.abs(b.price_change_percentage_24h) -
        Math.abs(a.price_change_percentage_24h),
    )
    .slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          🔥 Top Movers — Real-time
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-indigo-500 opacity-60"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {sorted.map((coin, i) => {
          const chg = coin.price_change_percentage_24h;
          const isUp = chg >= 0;
          const spark = coin.sparkline_in_7d?.price?.slice(-48) ?? [];
          const svg = generateSparkSvg(spark, isUp);

          return (
            <motion.div
              key={coin.id}
              className="glass rounded-xl p-3 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, rotateX: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] overflow-hidden flex items-center justify-center text-sm shrink-0">
                    {coin.image ? (
                      <Image
                        src={coin.image}
                        alt={coin.symbol}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      coin.symbol.charAt(0)
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">
                      {coin.name}
                    </div>
                    <div className="text-[0.6rem] font-mono text-slate-500 uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[0.65rem] font-mono font-bold px-1.5 py-0.5 rounded
                  ${isUp ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}
                >
                  {fmtPct(chg)}
                </span>
              </div>

              <div className="text-base font-bold tabular-nums mb-0.5">
                {priceStr(coin.current_price)}
              </div>
              <div className="text-[0.62rem] font-mono text-slate-500 mb-2">
                Vol: {fmtUSD(coin.total_volume ?? 0)}
              </div>

              {/* Sparkline */}
              <div className="h-10" dangerouslySetInnerHTML={{ __html: svg }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
