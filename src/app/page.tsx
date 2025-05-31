'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Stats from '../components/Stats'
import HowItWorks from '../components/HowItWorks'
import RevenueCalculator from '../components/RevenueCalculator'
import Features from '../components/Features'
import Solutions from '../components/Solutions'
import CTABanner from '../components/CTABanner'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

// Fallback background component
const FallbackBackground = () => (
  <div className="fixed inset-0 bg-black -z-10">
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
  </div>
)

// Dynamically import WebGLBackground with no SSR and error handling
const DynamicWebGLBackground = dynamic(
  () => import('../components/WebGLBackground').catch(() => () => <FallbackBackground />),
  { 
    ssr: false,
    loading: () => <FallbackBackground />
  }
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen relative">
      {mounted && <DynamicWebGLBackground />}
      <Navbar />
      <Hero />
      <TrustedBy />
      <Stats />
      <HowItWorks />
      <Features />
      <Solutions />
      <CTABanner />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
