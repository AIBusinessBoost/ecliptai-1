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

// Dynamically import WebGLBackground with no SSR
const DynamicWebGLBackground = dynamic(
  () => import('../components/WebGLBackground'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black -z-10">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
      </div>
    )
  }
)

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true)
    
    // Simulate loading time for WebGL initialization
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Don't render anything during SSR
  if (!isMounted) {
    return null
  }
  
  return (
    <main className="relative overflow-x-hidden">
      {!isLoaded && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">EcliptAI</div>
            <div className="w-16 h-16 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      
      {isLoaded && <DynamicWebGLBackground />}
      <Navbar />
      
      <div className="w-full">
        <Hero />
        <TrustedBy />
        <Stats />
        <HowItWorks />
        <RevenueCalculator />
        <Features />
        <Solutions />
        <CTABanner />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
