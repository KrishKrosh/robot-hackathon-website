"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import dynamic from 'next/dynamic'

// Dynamically import RobotArm with no SSR
const RobotArm = dynamic(() => import('../components/RobotArm'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f5f5]">
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
    // This only controls the initial page load
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
    document.documentElement.style.position = "static"
    document.documentElement.style.height = "auto"

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
      <HamburgerMenu />
      
      {/* Hero section - exactly viewport height */}
      <section className="relative w-full overflow-hidden bg-[#f5f5f5]" style={{ height: '100dvh', maxHeight: '100dvh' }}>
        {/* Main content with RobotArm - optimized for touch interactions */}
        <div className="absolute inset-0 w-full h-full touch-manipulation">
          {/* RobotArm now handles its own loading state */}
          <div className="absolute inset-0 w-full h-full touch-manipulation flex items-center justify-center">
            <div className="w-full h-full max-w-[1200px] max-h-[800px]">
              {isLoaded ? <RobotArm /> : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f5f5]">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="font-['VCR_OSD_Mono'] tracking-wide text-black text-sm sm:text-base">
                    LOADING...
                  </div>
                </div>
              )}
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

        {/* Date in bottom right - with VCR font - fixed for mobile visibility */}
        <div className="fixed md:absolute bottom-6 sm:bottom-12 right-3 sm:right-12 text-right z-20 pointer-events-none select-text">
          <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide text-black leading-none">
            APRIL 19 & 20TH
          </div>
          <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide text-black leading-none mt-[-2px]">
            MEATPACKING DISTRICT, NYC
          </div>
          <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide leading-none whitespace-nowrap text-gray-600">
            BETAWORKS // ALLEYCORP // UPFRONT
          </div>
        </div>
        
        {/* Scroll indicator */}
        {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center animate-pulse">
          <div className="text-xs font-['VCR_OSD_Mono'] tracking-wide text-black mb-2">
            SCROLL
          </div>
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-black rounded-full mt-2 animate-bounce"></div>
          </div>
        </div> */}
      </section>

      {/* Info section - positioned after hero */}
      {/* <section className="relative w-full py-20 bg-[#f5f5f5]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl mb-8 font-['VCR_OSD_Mono'] tracking-wide text-black border-b-2 border-black pb-4">
              ABOUT THE HACKATHON
            </h2>
            <p className="text-lg sm:text-xl font-['VCR_OSD_Mono'] tracking-wide leading-relaxed">
              We're hosting an AI + Robot Arm hackathon for the best builders in NYC. Dive into the world of robotics and build something amazing with robot arms. You get to keep them!
            </p>
            <div className="mt-12 flex justify-center">
              <a
                href="https://lu.ma/z29r63z9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black bg-black text-white rounded-md px-8 py-3 text-sm sm:text-base font-['VCR_OSD_Mono'] tracking-wide pointer-events-auto hover:bg-white hover:text-black transition-colors"
              >
                APPLY NOW
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  )
}

