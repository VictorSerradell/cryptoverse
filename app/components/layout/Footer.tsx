export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-8 py-6 flex items-center justify-center gap-8 flex-wrap">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-mono text-slate-500 hover:text-indigo-400 transition-colors"
      >
        GitHub
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-mono text-slate-500 hover:text-indigo-400 transition-colors"
      >
        Twitter / X
      </a>
      <span className="text-xs font-mono text-slate-500">
        Powered by{" "}
        <a
          href="https://coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition-colors"
        >
          CoinGecko API
        </a>
      </span>
      <span className="text-xs font-mono text-slate-700">
        CryptoVerse v2.0.26 — 2026
      </span>
    </footer>
  );
}
