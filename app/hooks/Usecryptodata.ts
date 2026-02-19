'use client'
import useSWR from 'swr'
import { PORTFOLIO_IDS, TOP_50_IDS } from '@/app/lib/constants'
import { useCryptoStore } from '../store/Cryptostore'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ALL_IDS = [...new Set([...PORTFOLIO_IDS, ...TOP_50_IDS])].join(',')

const MARKET_URL =
  `/api/crypto?endpoint=/coins/markets&params=` +
  encodeURIComponent(
    `vs_currency=usd&ids=${ALL_IDS}&order=market_cap_desc&per_page=100&sparkline=true&price_change_percentage=24h,7d`
  )

export function useCryptoData() {
  const { setCoins, setLoading } = useCryptoStore()

  const { data, error, isLoading, mutate } = useSWR(MARKET_URL, fetcher, {
    refreshInterval: 30_000,
    onSuccess: (data) => {
      if (Array.isArray(data)) setCoins(data)
    },
    onLoadingSlow: () => setLoading(true),
  })

  return { data, error, isLoading, refresh: mutate }
}

export function usePriceHistory(coinId: string, days: number) {
  const url = `/api/crypto?endpoint=/coins/${coinId}/market_chart&params=${encodeURIComponent(`vs_currency=usd&days=${days}`)}`
  return useSWR(url, fetcher, { revalidateOnFocus: false })
}

export function useFearGreed() {
  const { setFearGreed } = useCryptoStore()
  return useSWR('/api/feargreed', fetcher, {
    refreshInterval: 3_600_000,
    onSuccess: (data) => {
      if (data?.data?.[0]) {
        setFearGreed({
          value: parseInt(data.data[0].value),
          label: data.data[0].value_classification,
        })
      }
    },
  })
}