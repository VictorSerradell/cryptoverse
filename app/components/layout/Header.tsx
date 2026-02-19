"use client";
import { useCryptoStore } from "@/app/store/Cryptostore";
import { RefreshCw, Search } from "lucide-react";
import { useState, useCallback } from "react";
import { useCryptoData } from "@/app/hooks/Usecryptodata";

export function Header() {
  const { refresh } = useCryptoData();
  const lastUpdated = useCryptoStore((s) => s.lastUpdated);
  const coins = useCryptoStore((s) => s.coins);
  const [spinning, setSpinning] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<(typeof coins)[string][]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const matches = Object.values(coins)
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.symbol.toLowerCase().includes(q.toLowerCase()),
      )
      .slice(0, 6);
    setResults(matches);
  };

  const handleRefresh = useCallback(async () => {
    setSpinning(true);
    await refresh();
    setTimeout(() => setSpinning(false), 800);
  }, [refresh]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(2,2,7,0.85)] border-b border-white/[0.08] px-8 h-16 flex items-center justify-between gap-6">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 shrink-0 no-underline">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-base animate-logo-glow shadow-neon">
          ⬡
        </div>
        <span className="text-lg font-bold tracking-tight text-neon">
          CryptoVerse
        </span>
      </a>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={() => setTimeout(() => setResults([]), 200)}
          placeholder="Search tokens, coins, DeFi..."
          className="w-full glass rounded-xl py-2 pl-9 pr-4 text-sm font-sans outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all placeholder:text-slate-500 text-slate-100"
        />
        {results.length > 0 && (
          <div className="absolute top-full mt-1 w-full glass rounded-xl overflow-hidden border border-white/[0.08] z-50">
            {results.map((coin) => (
              <a
                key={coin.id}
                href={`https://coingecko.com/en/coins/${coin.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.06] transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coin.image}
                  alt={coin.symbol}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{coin.name}</span>
                <span className="text-xs font-mono text-slate-500 uppercase">
                  {coin.symbol}
                </span>
                <span
                  className={`ml-auto text-xs font-mono font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Live badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 glass px-3 py-1.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          {lastUpdated
            ? `LIVE · ${lastUpdated.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}`
            : "LIVE"}
        </div>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold glass px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
        >
          <RefreshCw size={13} className={spinning ? "animate-spin" : ""} />
          Refresh
        </button>

        {/* Connect Wallet */}
        <button
          onClick={() => open()}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 transition-all shadow-neon"
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
