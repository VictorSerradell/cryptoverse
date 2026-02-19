# CryptoVerse 🔮
> Premium real-time crypto dashboard — Next.js 15 · TypeScript · Tailwind · Three.js · Framer Motion · wagmi

## Stack
- **Next.js 15** — App Router, Server Components, Turbopack
- **TypeScript** estricto
- **Tailwind CSS** con tema neon personalizado
- **Three.js** — fondo de nodos blockchain + orb 3D interactivo
- **Framer Motion** — animaciones spring y scroll-triggered
- **Recharts** — gráficos de precio con área y tooltips
- **Zustand** — estado global ligero
- **SWR** — fetching con cache y auto-refresco cada 30s
- **wagmi + Web3Modal** — wallet connect real (400+ wallets)
- **CoinGecko API** — datos de mercado reales
- **Fear & Greed API** — índice de alternative.me

## Inicio rápido

```bash
# 1. Clona e instala
git clone https://github.com/TU_USUARIO/cryptoverse.git
cd cryptoverse
npm install

# 2. Configura las variables de entorno
cp .env.local.example .env.local
# Edita .env.local y añade tu NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

# 3. Arranca en desarrollo
npm run dev
# → http://localhost:3000
```

## Variables de entorno

| Variable | Descripción | Requerida |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ID de [cloud.walletconnect.com](https://cloud.walletconnect.com) | ✅ |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app | ✅ |
| `COINGECKO_API_KEY` | API key de CoinGecko (más rate limits) | ❌ |

## Deploy en Vercel

```bash
npm install -g vercel
vercel
```

O conecta el repo en [vercel.com](https://vercel.com) para deploy automático en cada push.

Añade las variables de entorno en **Vercel → Settings → Environment Variables**.

## Estructura

```
cryptoverse/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Dashboard principal
│   └── api/
│       ├── crypto/         # Proxy → CoinGecko (sin CORS)
│       └── feargreed/      # Fear & Greed index
├── components/
│   ├── layout/             # Header, Footer
│   ├── dashboard/          # Todos los widgets
│   └── three/              # BackgroundCanvas, OrbCanvas
├── hooks/                  # useCryptoData, usePriceHistory
├── lib/                    # constants, formatters, utils
├── store/                  # Zustand store
└── providers/              # Web3Provider (wagmi)
```

## Créditos
- Datos de mercado: [CoinGecko](https://coingecko.com)
- Fear & Greed: [alternative.me](https://alternative.me/crypto/fear-and-greed-index/)
- Wallet Connect: [WalletConnect](https://walletconnect.com)