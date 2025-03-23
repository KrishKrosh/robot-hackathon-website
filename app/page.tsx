"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Improve touch handling for the iframe content
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default only if touching the iframe to avoid blocking all scrolling
      if ((e.target as Element)?.closest("iframe")) {
        // Allow the iframe to handle the touch event
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
      {/* Main content with iframe - optimized for touch interactions */}
      <div className="absolute inset-0 w-full h-full touch-manipulation">
        {isLoaded && (
          <iframe
            src="https://app.endlesstools.io/embed/ba06feb7-8920-4d0d-9e4b-ba04020bf0b9"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              border: "none",
              touchAction: "manipulation",
            }}
            title="Endless Tools Editor"
            allow="clipboard-write; encrypted-media; gyroscope; web-share; accelerometer; autoplay; camera"
            allowFullScreen
            allowTransparency
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      {/* Top left text layout - with VCR font - optimized for mobile */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 z-10 max-w-[90vw] sm:max-w-none pointer-events-none">
        <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide leading-none whitespace-nowrap">
          BETAWORKS // ALLEYCORP // UPFRONT
        </div>
        <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide flex flex-wrap sm:flex-nowrap items-center leading-none mt-[-2px]">
          [ ROBOT ARM HACKATHON ] WITH LeRobot
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
          className="inline-block border-2 border-black bg-black text-white rounded-md px-4 py-1 text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide pointer-events-auto hover:bg-white hover:text-black transition-colors"
        >
          RSVP
        </a>
      </div>

      {/* Date in bottom right - with VCR font - optimized for mobile */}
      <div className="absolute bottom-6 sm:bottom-12 right-3 sm:right-12 text-right z-10 pointer-events-none">
        <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide text-black leading-none">
          APRIL 19 & 20TH
        </div>
        <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide text-black leading-none mt-[-2px]">
          MEATPACKING DISTRICT, NY
        </div>
      </div>
    </div>
  )
}

