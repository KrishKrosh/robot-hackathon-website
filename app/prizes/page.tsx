"use client"

import Link from "next/link"
import dynamic from 'next/dynamic'
import { useEffect } from "react"
import Image from "next/image"

// Dynamically import HamburgerMenu
const HamburgerMenu = dynamic(() => import('../../components/HamburgerMenu'), { ssr: false })

// Prize card component
const PrizeCard = ({ 
  title, 
  description, 
  value, 
  position,
  isSponsored,
  href,
  judge
}: { 
  title: string; 
  description: string; 
  value: string;
  position: string;
  href?: string;
  isSponsored?: boolean;
  judge?: string;
}) => {
  return (
    <div className={`border-2 border-black bg-white p-4 sm:p-6 relative ${
      position === "1st" ? "border-4" : ""
    } select-text flex flex-col h-full`}>
      {position === "1st" && (
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-black flex items-center justify-center">
          <div className="text-white font-['VCR_OSD_Mono'] text-xl">★</div>
        </div>
      )}
      {isSponsored && (
        <div className="font-['VCR_OSD_Mono'] tracking-wide mb-1 text-base sm:text-lg">
        Sponsored by <a href={href} className="hover:underline">{position}</a>
      </div>
      )}
      {!isSponsored && (
        <div className="font-['VCR_OSD_Mono'] tracking-wide mb-1 text-base sm:text-lg">
        {position} PRIZE:
      </div>
      )}
      <h3 className="text-lg sm:text-xl font-['VCR_OSD_Mono'] tracking-wide text-black mb-2 border-b border-black pb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base font-['VCR_OSD_Mono'] tracking-wide mb-4 flex-grow">
        {description}
      </p>
      <div className="mt-auto">
        {judge && (
          <p className="text-sm font-['VCR_OSD_Mono'] tracking-wide mb-2">
            Judged by: {judge}
          </p>
        )}
        <div className="bg-black text-white font-['VCR_OSD_Mono'] tracking-wide text-center py-2">
          {value}
        </div>
      </div>
    </div>
  )
}

export default function PrizesPage() {
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
      <HamburgerMenu currentPage="PRIZES" isHomePage={false} />
      
      {/* Main content */}
      <div className="pt-16 pb-32 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 pt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-['VCR_OSD_Mono'] tracking-wide text-black border-b-2 border-black pb-4 select-text">
              PRIZES & REWARDS
            </h1>
          </div>
          
          {/* Intro text */}
          <div className="mb-10">
            <p className="text-base sm:text-lg font-['VCR_OSD_Mono'] tracking-wide select-text">
              All participants get to keep their robot arms, but the top projects will receive additional prizes and recognition. <br/> <br/>More prizes to be announced soon!
            </p>
          </div>
          
          {/* Prize Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PrizeCard 
              position="1st"
              title="GRAND CHAMPION" 
              description="The best overall project combining innovation, technical execution, and real-world potential." 
              value="Bambulabs 3D Printers"
            />
            <PrizeCard 
              position="2nd"
              title="RUNNER-UP" 
              description="Outstanding project with exceptional technical merit and creative application of the robot arm technology." 
              value="PRIZE TBD"
            />
            <PrizeCard 
              position="INNATE ROBOTICS"
              title="BEST AGENTIC APPLICATION" 
              description="Best application demonstrating agentic capabilities with the robot arm." 
              value="$2000"
              href="https://innate.bot"
              isSponsored={true}
              judge="Axel Peytavin"
            />
            <PrizeCard 
              position="PALATIAL XR"
              title="SIMULATION AWARD" 
              description="Most innovative use of simulation in creating a robot arm application." 
              value="$1000"
              href="https://www.palatialxr.com"
              isSponsored={true}
              judge="Steven Ren"
            />
            <PrizeCard 
              position="RUNPOD"
              title="TRAINING AWARD" 
              description="Use of RunPod GPUs to train/serve a model for your robot arm!" 
              value="$2,000 in RunPod Credits"
              href="https://www.runpod.io"
              isSponsored={true}
              judge="Aadil Ali"
            />
            <PrizeCard 
              position="INTERLACE OF"
              title="FASHION AWARD"
              description="Best robotics application interfacing with fabrics or textiles. Explorations into any aspect of the textile assembly line: handling fabrics, cutting, sewing, folding."
              value="$1000"
              href="https://www.interlaceof.com"
              isSponsored={true}
              judge="Naama P"
            />
            <PrizeCard 
              position="FISH AUDIO"
              title="BEST USE OF VOICE" 
              description="Best application integrating voice technology with the robot arm." 
              value="$1000"
              href="https://fish.audio"
              isSponsored={true}
              judge="Aili Liu"
            />
          </div>
          
          {/* Additional Prizes */}
          <div className="mt-12 border-2 border-black bg-white p-4 sm:p-6 select-text">
            <h2 className="text-xl sm:text-2xl font-['VCR_OSD_Mono'] tracking-wide text-black mb-4 border-b-2 border-black pb-2">
              MAIN JUDGES
            </h2>
            <ul className="space-y-4">
              <li className="font-['VCR_OSD_Mono'] tracking-wide">
                <span className="text-base sm:text-lg font-bold block">Krish Shah</span>
                <span className="text-sm sm:text-base">Organizer. ML Engineer @ X. Independent robotics researcher.</span>
              </li>
              <li className="font-['VCR_OSD_Mono'] tracking-wide">
                <span className="text-base sm:text-lg font-bold block">Krish Mehta</span>
                <span className="text-sm sm:text-base">Organizer. ML Engineer @ Palatial XR.</span>
              </li>
              <li className="font-['VCR_OSD_Mono'] tracking-wide">
                <span className="text-base sm:text-lg font-bold block">Peter Walkington</span>
                <span className="text-sm sm:text-base">Neuromotor Interfaces and Virtual Reality at Meta.</span>
              </li>
            </ul>
          </div>
          
          {/* Everyone Wins */}
          <div className="mt-10 text-center p-6 border-2 border-black bg-black text-white select-text">
            <h2 className="text-xl sm:text-2xl font-['VCR_OSD_Mono'] tracking-wide mb-4">
              EVERYONE WINS!
            </h2>
            <p className="text-base sm:text-lg font-['VCR_OSD_Mono'] tracking-wide mb-4">
              ALL TEAMS GET TO KEEP THEIR ROBOT ARM!
            </p>
            <p className="text-sm sm:text-base font-['VCR_OSD_Mono'] tracking-wide">
              Plus, all teams receive networking opportunities with industry leaders.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="mt-10 text-center">
            <Link
              href="https://lu.ma/z29r63z9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-black bg-black text-white rounded-md px-6 py-3 text-base font-['VCR_OSD_Mono'] tracking-wide hover:bg-white hover:text-black transition-colors"
            >
              RSVP NOW
            </Link>
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