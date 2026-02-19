"use client";

import { TOP_50_IDS, DOMINANCE_COINS } from "@/app/lib/constants";
import { fmt } from "@/app/lib/formatters";
import { useCryptoStore } from "@/app/store/Cryptostore";

export function Dominance() {
  const coins = useCryptoStore((s) => s.coins);

  const tracked = TOP_50_IDS.map((id) => coins[id]).filter(Boolean);
  const totalMcap = tracked.reduce((s, c) => s + (c.market_cap ?? 0), 0);

  const rows = DOMINANCE_COINS.map((d) => ({
    ...d,
    pct: totalMcap > 0 ? ((coins[d.id]?.market_cap ?? 0) / totalMcap) * 100 : 0,
  }));

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.08]">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
          ⬡ Dominance
        </span>
      </div>
      <div className="px-6 py-4 flex flex-col gap-0">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0"
          >
            <span
              className="text-xs font-semibold min-w-[3rem]"
              style={{ color: r.color }}
            >
              {r.label}
            </span>
            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${r.pct}%`, background: r.color }}
              />
            </div>
            <span
              className="text-xs font-mono font-semibold min-w-[3.5rem] text-right"
              style={{ color: r.color }}
            >
              {fmt(r.pct, 1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
