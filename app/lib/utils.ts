import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSparkSvg(data: number[], positive: boolean): string {
  if (!data || data.length < 2) {
    return '<svg viewBox="0 0 100 40"><line x1="0" y1="20" x2="100" y2="20" stroke="#334155" stroke-width="1"/></svg>'
  }
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 36 - ((v - min) / range) * 32
    return `${x},${y}`
  })
  const color  = positive ? '#10b981' : '#ef4444'
  const gColor = positive ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'
  const first  = pts[0].split(',')[0]
  const last   = pts[pts.length - 1].split(',')[0]
  const poly   = `${first},36 ${pts.join(' ')} ${last},36`
  const uid    = Math.random().toString(36).slice(2, 7)

  return `<svg viewBox="0 0 100 40" preserveAspectRatio="none" style="width:100%;height:100%">
    <defs>
      <linearGradient id="sg${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${gColor}"/>
        <stop offset="100%" stop-color="transparent"/>
      </linearGradient>
    </defs>
    <polygon points="${poly}" fill="${gColor}"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}