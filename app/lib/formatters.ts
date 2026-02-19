export const fmt = (n: number | null | undefined, decimals = 2): string => {
  if (n == null) return '--'
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const fmtUSD = (n: number): string => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(1)}M`
  return `$${fmt(n)}`
}

export const fmtPct = (n: number | null | undefined): string => {
  if (n == null) return '--'
  return `${n > 0 ? '+' : ''}${fmt(n)}%`
}

export const priceStr = (p: number): string => {
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (p >= 1)    return `$${fmt(p)}`
  return `$${p.toFixed(5)}`
}

export const fmtCompact = (n: number): string => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(0)}M`
  return `$${n.toFixed(0)}`
}