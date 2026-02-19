import { NextRequest, NextResponse } from 'next/server'

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint') ?? ''
  const params   = searchParams.get('params')   ?? ''

  try {
    const url = `${COINGECKO_BASE}${endpoint}${params ? `?${params}` : ''}`

    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        ...(process.env.COINGECKO_API_KEY
          ? { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }
          : {}),
      },
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `CoinGecko responded with ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    console.error('[API/crypto]', error)
    return NextResponse.json({ error: 'Failed to fetch from CoinGecko' }, { status: 500 })
  }
}