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

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Improve touch handling
    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as Element)?.closest("canvas")) {
        e.stopPropagation()
      }
    }

    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full bg-[#f5f5f5] overflow-hidden">
      {/* Main content with 3D robot arm */}
      <div className="absolute inset-0 w-full h-full touch-manipulation flex items-center justify-center">
        <div className="w-full h-full max-w-[1200px] max-h-[800px]">
          <RobotArm />
        </div>
      </div>

      {/* Top left text layout */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 z-10 max-w-[90vw] sm:max-w-none pointer-events-none">
        <div className="text-[10px] sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide leading-none whitespace-nowrap">
          BETAWORKS // ALLEYCORP // UPFRONT // JP MORGAN
        </div>
        <div className="text-[10px] sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide flex flex-wrap sm:flex-nowrap items-center leading-none mt-[-2px]">
          [ ROBOT ARM HACKATHON ] WITH <a href="https://github.com/huggingface/lerobot" target="_blank" rel="noopener noreferrer" className="pointer-events-auto">&nbsp;LeRobot</a>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hugging%20Face%20Logo-x7ku7o15UDiidNONFKxQ3BbyGlr33A.svg"
            alt="Hugging Face Logo"
            width={20}
            height={20}
            className="ml-1 sm:ml-2 inline-block"
          />
        </div>
      </div>

      {/* RSVP button in bottom left */}
      <div className="absolute bottom-6 sm:bottom-12 left-3 sm:left-6 z-10">
        <a
          href="https://lu.ma/z29r63z9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-black bg-black text-white rounded-md px-4 py-1 text-[10px] sm:text-sm font-['VCR_OSD_Mono'] tracking-wide pointer-events-auto hover:bg-white hover:text-black transition-colors"
        >
          RSVP
        </a>
      </div>

      {/* Date in bottom right */}
      <div className="absolute bottom-6 sm:bottom-12 right-3 sm:right-12 text-right z-10 pointer-events-none">
        <div className="text-[10px] sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide text-black leading-none">
          APRIL 19 & 20TH
        </div>
        <div className="text-[10px] sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide text-black leading-none mt-[-2px]">
          MEATPACKING DISTRICT, NYC
        </div>
      </div>
    </div>
  )
}

