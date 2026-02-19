"use client";
import { useCryptoData } from "@/app/hooks/Usecryptodata";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { RefreshCw } from "lucide-react";
import { useState, useCallback } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export function Header() {
  const { refresh } = useCryptoData();
  const lastUpdated = useCryptoStore((s) => s.lastUpdated);
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = useCallback(async () => {
    setSpinning(true);
    await refresh();
    setTimeout(() => setSpinning(false), 800);
  }, [refresh]);

  const { open } = useWeb3Modal();


  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(2,2,7,0.85)] border-b border-white/[0.08] px-8 h-16 flex items-center justify-between gap-6">
      <a href="/" className="flex items-center gap-2 shrink-0 no-underline">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-base animate-logo-glow shadow-neon">
          ⬡
        </div>
        <span className="text-lg font-bold tracking-tight text-neon">
          CryptoVerse
        </span>
      </a>

      <div className="flex-1 max-w-sm relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search tokens, coins, DeFi..."
          className="w-full glass rounded-xl py-2 pl-9 pr-4 text-sm font-sans outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all placeholder:text-slate-500 text-slate-100"
        />
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 glass px-3 py-1.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          {lastUpdated
            ? `LIVE · ${lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
            : "LIVE"}
        </div>

        <button
          onClick={handleRefresh}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold glass px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
        >
          <RefreshCw size={13} className={spinning ? "animate-spin" : ""} />
          Refresh
        </button>

        <button onClick={() => open()}
  className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 transition-all shadow-neon"
>
  Connect Wallet
</button>
      </div>
    </header>
  );
}
