'use client'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

const metadata = {
  name: 'CryptoVerse',
  description: 'Premium Crypto Dashboard 2026',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [mainnet, polygon, arbitrum, optimism, base] as const
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// Solo inicializa en el cliente
if (typeof window !== 'undefined') {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#6366f1',
      '--w3m-border-radius-master': '8px',
      '--w3m-font-family': 'Space Grotesk, sans-serif',
    },
  })
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}