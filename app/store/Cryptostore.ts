import { create } from 'zustand'

export interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  price_change_percentage_7d_in_currency: number
  market_cap: number
  total_volume: number
  image: string
  sparkline_in_7d?: { price: number[] }
}

interface CryptoStore {
  coins: Record<string, CoinData>
  isLoading: boolean
  lastUpdated: Date | null
  fearGreed: { value: number; label: string } | null
  setCoins: (coins: CoinData[]) => void
  setLoading: (v: boolean) => void
  setFearGreed: (data: { value: number; label: string }) => void
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  coins:       {},
  isLoading:   true,
  lastUpdated: null,
  fearGreed:   null,

  setCoins: (coins) =>
    set({
      coins: Object.fromEntries(coins.map((c) => [c.id, c])),
      lastUpdated: new Date(),
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setFearGreed: (data) => set({ fearGreed: data }),
}))