import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://api.alternative.me/fng/?limit=1', {
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error(`Fear & Greed API error: ${res.status}`)

    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('[API/feargreed]', error)
    return NextResponse.json({ error: 'Failed to fetch Fear & Greed' }, { status: 500 })
  }
}