'use client'
import { useEffect } from 'react'
import { Dominance } from './components/dashboard/Dominance'
import { FearGreed } from './components/dashboard/Feargreed'
import { Heatmap } from './components/dashboard/Heatmap'
import { HeroSection } from './components/dashboard/Herosection'
import { PortfolioTable } from './components/dashboard/Portfoliotable'
import { PriceChart } from './components/dashboard/Pricechart'
import { QuickStats } from './components/dashboard/Quickstats'
import { TopMovers } from './components/dashboard/Topmovers'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { BackgroundCanvas } from './components/three/Backgroundcanvas'
import { useCryptoData } from './hooks/Usecryptodata'


export default function DashboardPage() {
  const { isLoading } = useCryptoData()

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <BackgroundCanvas />

      {/* App shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 px-4 md:px-8 py-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
          <HeroSection />
          <QuickStats />
          <TopMovers />

          {/* Chart + Right panel */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            <PriceChart />
            <div className="flex flex-col gap-4">
              <FearGreed />
              <Dominance />
            </div>
          </div>

          <PortfolioTable />
          <Heatmap />
        </main>

        <Footer />
      </div>
    </div>
  )
}