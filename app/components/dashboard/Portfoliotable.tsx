"use client";
import { PORTFOLIO_HOLDINGS } from "@/app/lib/constants";
import { fmt, fmtPct, priceStr } from "@/app/lib/formatters";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { motion } from "framer-motion";
import Image from "next/image";

export function PortfolioTable() {
  const coins = useCryptoStore((s) => s.coins);

  let total = 0;
  const rows = PORTFOLIO_HOLDINGS.map((h) => {
    const coin = coins[h.id];
    if (!coin) return null;
    const value = coin.current_price * h.amount;
    total += value;
    return { ...h, coin, value };
  }).filter(Boolean) as NonNullable<
    ReturnType<(typeof PORTFOLIO_HOLDINGS)["map"]>[number]
  >[];

  rows.forEach((r: any) => {
    r.alloc = (r.value / total) * 100;
  });

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
          💼 Portfolio Holdings
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">Total:</span>
          <span className="text-sm font-bold text-emerald-400">
            ${fmt(total)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {[
                "#",
                "Asset",
                "Price",
                "Holdings",
                "Value",
                "24h",
                "7d",
                "Allocation",
              ].map((h) => (
                <th
                  key={h}
                  className="text-[0.65rem] font-mono text-slate-500 uppercase tracking-widest
                                       py-3 px-4 text-left bg-white/[0.02] border-b border-white/[0.06] font-medium last:text-right"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows as any[]).map((r, i) => {
              const chg24 = r.coin.price_change_percentage_24h;
              const chg7 = r.coin.price_change_percentage_7d_in_currency;
              return (
                <motion.tr
                  key={r.id}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <td className="py-4 px-4 text-xs font-mono text-slate-600">
                    {i + 1}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] overflow-hidden flex items-center justify-center text-xs shrink-0">
                        {r.coin.image ? (
                          <Image
                            src={r.coin.image}
                            alt={r.symbol}
                            width={28}
                            height={28}
                            className="object-cover"
                          />
                        ) : (
                          r.emoji
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className="text-[0.65rem] font-mono text-slate-500">
                          {r.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="py-4 px-4 font-mono text-sm font-semibold tabular-nums"
                    id={`tbl-${r.id}`}
                  >
                    {priceStr(r.coin.current_price)}
                  </td>
                  <td className="py-4 px-4 font-mono text-sm text-slate-400">
                    {fmt(r.amount, r.amount < 1 ? 4 : 2)} {r.symbol}
                  </td>
                  <td className="py-4 px-4 font-mono text-sm font-semibold tabular-nums">
                    ${fmt(r.value)}
                  </td>
                  <td
                    className={`py-4 px-4 font-mono text-sm font-semibold ${chg24 >= 0 ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {fmtPct(chg24)}
                  </td>
                  <td
                    className={`py-4 px-4 font-mono text-sm font-semibold ${chg7 >= 0 ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {fmtPct(chg7)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="w-20 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-700"
                          style={{ width: `${(r as any).alloc}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-500 min-w-[3rem] text-right">
                        {fmt((r as any).alloc, 1)}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
