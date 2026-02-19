export const PORTFOLIO_HOLDINGS = [
  { id: 'bitcoin',      symbol: 'BTC',  name: 'Bitcoin',    amount: 2.5,   emoji: '₿' },
  { id: 'ethereum',     symbol: 'ETH',  name: 'Ethereum',   amount: 18,    emoji: 'Ξ' },
  { id: 'solana',       symbol: 'SOL',  name: 'Solana',     amount: 120,   emoji: '◎' },
  { id: 'binancecoin',  symbol: 'BNB',  name: 'BNB',        amount: 35,    emoji: '🔶' },
  { id: 'cardano',      symbol: 'ADA',  name: 'Cardano',    amount: 8000,  emoji: '🔵' },
  { id: 'avalanche-2',  symbol: 'AVAX', name: 'Avalanche',  amount: 80,    emoji: '🔺' },
]

export const PORTFOLIO_IDS = PORTFOLIO_HOLDINGS.map(h => h.id)

export const TOP_50_IDS = [
  'bitcoin','ethereum','tether','binancecoin','solana','ripple','usdc','cardano',
  'avalanche-2','dogecoin','polkadot','chainlink','near','litecoin','uniswap',
  'toncoin','matic-network','internet-computer','stellar','shiba-inu',
  'wrapped-bitcoin','dai','cosmos','hedera-hashgraph','aptos','arbitrum',
  'vechain','filecoin','injective-protocol','optimism','the-graph',
  'quant-network','aave','maker','synthetix-network-token','curve-dao-token',
  'decentraland','sandbox','axie-infinity','enjincoin','flow','theta-token',
  'stacks','render-token','ocean-protocol','blur','gmx','lido-dao',
  'rocket-pool','frax-share',
]

export const COIN_SELECTOR = [
  { id: 'bitcoin',  label: '₿ BTC' },
  { id: 'ethereum', label: 'Ξ ETH' },
  { id: 'solana',   label: '◎ SOL' },
]

export const TIMEFRAMES = [
  { label: '1H',  days: 1   },
  { label: '24H', days: 7   },
  { label: '7D',  days: 30  },
  { label: '1Y',  days: 365 },
]

export const DOMINANCE_COINS = [
  { id: 'bitcoin',     label: 'BTC',  color: '#f59e0b' },
  { id: 'ethereum',    label: 'ETH',  color: '#8b5cf6' },
  { id: 'tether',      label: 'USDT', color: '#10b981' },
  { id: 'binancecoin', label: 'BNB',  color: '#f59e0b' },
  { id: 'solana',      label: 'SOL',  color: '#22d3ee' },
]