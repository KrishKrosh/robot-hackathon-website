"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from 'next/dynamic'

// Dynamically import RobotArm with no SSR
const RobotArm = dynamic(() => import('../components/RobotArm'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="font-['VCR_OSD_Mono'] tracking-wide text-black text-sm sm:text-base">
        LOADING...
      </div>
    </div>
  )
})

// Dynamically import HamburgerMenu
const HamburgerMenu = dynamic(() => import('../components/HamburgerMenu'), { ssr: false })

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set isLoaded to true after initial render
    setIsLoaded(true)

    // CRITICAL: Make sure body has no overflow on the hero section
    document.body.style.margin = "0"
    document.body.style.padding = "0"
    document.documentElement.style.margin = "0"
    document.documentElement.style.padding = "0"
    
    // Allow scrolling for content below hero section
    document.body.style.overflow = "auto"
    document.body.style.position = "static"
    document.body.style.height = "auto"
    document.documentElement.style.overflow = "auto"
    
    // Improve touch handling
    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as Element)?.closest("canvas")) {
        e.stopPropagation()
      }
    }

    // Add the event listener with passive: true to allow scrolling
    document.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <main className="bg-[#f5f5f5] select-text overflow-x-hidden" style={{ height: "auto", position: "relative" }}>
      {/* Navbar with highest z-index */}
      <div className="relative z-50">
        <HamburgerMenu isHomePage={true} />
      </div>
      
      {/* Hero section - exactly viewport height */}
      <section className="relative w-full overflow-hidden bg-[#f5f5f5] z-0" style={{ height: '100dvh', maxHeight: '100dvh' }}>
        {/* Main content with RobotArm - optimized for touch interactions */}
        <div className="absolute inset-0 w-full h-full touch-manipulation">
          {/* RobotArm now handles its own loading state */}
          <div className="absolute inset-0 w-full h-full touch-manipulation flex items-center justify-center">
            <div className="w-full h-full max-w-[1200px] max-h-[800px] relative">
              <RobotArm />
            </div>
          </div>
        </div>

        {/* Top left text layout - with VCR font - optimized for mobile */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 z-10 max-w-[90vw] sm:max-w-none select-text">
          <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide flex flex-wrap sm:flex-nowrap items-center leading-none mt-[-2px]">
            [ ROBOT HACKATHON ] WITH<a href="https://github.com/huggingface/lerobot">&nbsp;LeRobot</a>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hugging%20Face%20Logo-x7ku7o15UDiidNONFKxQ3BbyGlr33A.svg"
              alt="Hugging Face Logo"
              width={20}
              height={20}
              className="ml-1 sm:ml-2 inline-block"
            />
          </div>
        </div>

        {/* APPLY button in bottom left */}
        <div className="absolute bottom-6 sm:bottom-12 left-3 sm:left-6 z-10">
          <a
            href="https://lu.ma/z29r63z9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-black bg-black text-white rounded-md px-4 py-1 text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide pointer-events-auto hover:bg-white hover:text-black transition-colors"
          >
            APPLY
          </a>
        </div>

        {/* Date and location in bottom right - with VCR font */}
        <div className="absolute bottom-6 sm:bottom-12 right-3 sm:right-6 text-right z-10 pointer-events-none select-text">
          <div className="text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide text-black leading-none">
            APRIL 19 & 20TH
          </div>
          <div className="text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide text-black leading-none mt-1">
            MEATPACKING DISTRICT, NYC
          </div>
          <div className="text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide leading-none mt-1 text-gray-600">
            BETAWORKS // ALLEYCORP // UPFRONT
          </div>
        </div>
      </section>
    </main>
  )
}

