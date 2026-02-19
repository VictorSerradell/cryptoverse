"use client";

import { useFearGreed } from "@/app/hooks/Usecryptodata";
import { useCryptoStore } from "@/app/store/Cryptostore";

export function FearGreed() {
  useFearGreed(); // trigger fetch
  const fearGreed = useCryptoStore((s) => s.fearGreed);

  const val = fearGreed?.value ?? 72;
  const label = fearGreed?.label ?? "Greed";
  const color =
    val >= 60
      ? "text-emerald-400"
      : val >= 40
        ? "text-amber-400"
        : "text-red-400";

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.08]">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
          😨 Fear & Greed Index
        </span>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-6 gap-3">
        <div
          className={`text-5xl font-bold tracking-tight tabular-nums ${color}`}
        >
          {val}
        </div>
        <div className={`text-sm font-semibold ${color}`}>{label}</div>

        {/* Meter */}
        <div
          className="w-full max-w-[200px] h-2 rounded-full relative"
          style={{
            background: "linear-gradient(90deg, #ef4444, #f59e0b, #10b981)",
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white rounded-sm shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-1000"
            style={{
              left: `${val}%`,
              transform: "translateX(-50%) translateY(-50%)",
            }}
          />
        </div>

        <div className="flex justify-between w-full max-w-[200px]">
          <span className="text-[0.6rem] font-mono text-red-400">Fear</span>
          <span className="text-[0.6rem] font-mono text-slate-500">
            Updated hourly
          </span>
          <span className="text-[0.6rem] font-mono text-emerald-400">
            Greed
          </span>
        </div>
      </div>
    </div>
  );
}
