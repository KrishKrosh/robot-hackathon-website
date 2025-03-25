"use client"

import Link from "next/link"
import dynamic from 'next/dynamic'
import { useEffect } from "react"
import Image from "next/image"

// Dynamically import HamburgerMenu
const HamburgerMenu = dynamic(() => import('../../components/HamburgerMenu'), { ssr: false })

export default function AboutPage() {
  useEffect(() => {
    // CRITICAL: Make sure body is scrollable
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
    <main className="bg-[#f5f5f5] select-text" style={{ minHeight: "100vh", height: "auto", overflow: "auto", position: "static" }}>
      <HamburgerMenu currentPage="ABOUT" isHomePage={false} />
      
      {/* Main content */}
      <div className="pt-16 pb-32 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 pt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-['VCR_OSD_Mono'] tracking-wide text-black border-b-2 border-black pb-4 select-text">
              ABOUT THE HACKATHON
            </h1>
          </div>
          
          {/* Content */}
          <div className="space-y-8 font-['VCR_OSD_Mono'] tracking-wide select-text">
            <p className="text-base sm:text-lg leading-relaxed">
              We're hosting an AI + Robot Arm hackathon for the best builders in NYC. 
              Dive into the world of robotics and build something amazing with robot arms. <br/><br/>
              The best part? You get to keep your robot arm!
            </p>
            
            <div className="border-2 border-black p-4 sm:p-6 bg-white">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-black pb-2">EVENT DETAILS:</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>DATE: APRIL 19 & 20TH, 2024</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>LOCATION: MEATPACKING DISTRICT, NYC</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>SPONSORS: BETAWORKS // ALLEYCORP // UPFRONT</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-black pb-2">WHAT TO EXPECT:</h2>
              <p className="mb-4">
                Join us for a weekend of innovation, collaboration, and cutting-edge robotics. 
                Work with AI-powered robot arms and build projects that push the boundaries of what's possible.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>ACCESS TO ROBOTIC ARMS FOR BUILDING</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>MENTORSHIP FROM LEADING EXPERTS</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>NETWORKING WITH FELLOW BUILDERS</span>
                </li>
                <li className="flex items-center">
                  <svg className="mr-2 w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>EXCITING PRIZES AND OPPORTUNITIES</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-6">
              <Link
                href="https://lu.ma/z29r63z9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black bg-black text-white rounded-md px-6 py-3 text-base font-['VCR_OSD_Mono'] tracking-wide hover:bg-white hover:text-black transition-colors"
              >
                APPLY NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation bar - changed from fixed to static */}
      <div className="relative w-full border-t-2 border-black py-3 px-4 z-20 bg-[#f5f5f5]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide hover:underline">
            ← BACK TO HOME
          </Link>
          <div className="text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide text-gray-600">
            ROBOT ARM HACKATHON
          </div>
        </div>
      </div>
    </main>
  )
} 