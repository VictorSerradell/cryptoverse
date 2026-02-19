import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        neon: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
          pink: '#ec4899',
          cyan: '#22d3ee',
          green: '#10b981',
          red: '#ef4444',
        },
      },
      animation: {
        'logo-glow': 'logoGlow 3s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        logoGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(99,102,241,0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.8)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(99,102,241,0.4)',
      },
    },
  },
  plugins: [],
}

export default config