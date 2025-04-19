"use client"

import Link from "next/link"
import dynamic from 'next/dynamic'
import { useEffect } from "react"

// Dynamically import HamburgerMenu
const HamburgerMenu = dynamic(() => import('../../components/HamburgerMenu'), { ssr: false })

// Schedule item component
const ScheduleItem = ({ 
  time, 
  title, 
  description,
}: { 
  time: string; 
  title: string; 
  description?: string;
}) => {
  return (
    <div className="border-2 border-black bg-white p-4 sm:p-6 mb-4 select-text">
      <div className="font-['VCR_OSD_Mono'] tracking-wide mb-1 text-base sm:text-lg">
        {time}
      </div>
      <h3 className="text-lg sm:text-xl font-['VCR_OSD_Mono'] tracking-wide text-black mb-2 border-b border-black pb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm sm:text-base font-['VCR_OSD_Mono'] tracking-wide">
          {description}
        </p>
      )}
    </div>
  )
}

// Day header component
const DayHeader = ({ 
  day, 
  date,
}: { 
  day: string; 
  date: string;
}) => {
  return (
    <div className="bg-black text-white p-4 mb-6 border-2 border-black">
      <h2 className="text-xl sm:text-2xl font-['VCR_OSD_Mono'] tracking-wide">
        {day} – {date}
      </h2>
    </div>
  )
}

export default function SchedulePage() {
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
      <HamburgerMenu currentPage="SCHEDULE" isHomePage={false} />
      
      {/* Main content */}
      <div className="pt-16 pb-32 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 pt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-['VCR_OSD_Mono'] tracking-wide text-black border-b-2 border-black pb-4 select-text">
              EVENT SCHEDULE
            </h1>
          </div>
          
          {/* Intro text */}
          <div className="mb-10">
            <p className="text-base sm:text-lg font-['VCR_OSD_Mono'] tracking-wide select-text">
              Plan your hackathon weekend with our detailed schedule below. All activities take place at the venue unless otherwise noted.
              <br />
              All hacker info is available <Link href="https://docs.google.com/document/d/1jQuhpEz21fou7CUBk4ZGrIURsNY8sgXA6IozKYCc_9E/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">here</Link>.
              <br />
              <span className="text-sm sm:text-base">
                <strong>Note:</strong> The schedule is subject to change.
              </span>
            </p>
          </div>
          
          {/* Day 1 Schedule */}
          <DayHeader day="Day 1" date="Saturday, April 19, 2025" />
          
          <ScheduleItem 
            time="9:00 AM"
            title="Check‑In Opens"
            description="Check-in on Luma. Coffee/tea, and a breakfast bite. Find your table and meet your teammates/find teammates"
          />
          
          <ScheduleItem 
            time="10:00 AM"
            title="Opening Ceremony"
          />
          
          <ScheduleItem 
            time="10:30 AM"
            title="Hack Time Begins"
          />
          
          <ScheduleItem 
            time="1:30 PM"
            title="Lunch"
            description="Thai lunch provided by our friends at JP Morgan"
          />
          
          <ScheduleItem 
            time="3:00 PM"
            title="Fireside Chat"
            description="Join a casual panel with Ryan, Xavier, Brannon & Claire on the state and future of robotics."
          />
          
          <ScheduleItem 
            time="6:45 PM"
            title="Dinner"
            description="Pizza provided by our friends at JP Morgan"
          />
          
          <ScheduleItem 
            time="11:00 PM"
            title="Day 1 Wrap"
            description="Leave your setup intact for tomorrow, or bring it home to keep grinding; double‑check that you've saved everything, and left the place in a neat fashion."
          />
          
          {/* Day 2 Schedule */}
          <div className="mt-12">
            <DayHeader day="Day 2" date="Sunday, April 20, 2025" />
            
            <ScheduleItem 
              time="9:00 AM"
              title="Doors Open"
              description="Coffee and breakfast available"
            />
            
            <ScheduleItem 
              time="1:15 PM"
              title="Lunch"
              description="Buffet served. Be ready to hand in any remaining deliverables."
            />
            
            <ScheduleItem 
              time="3:00 PM"
              title="Final Submissions"
              description="- Submit everything (including mandatory 1 min video) to devpost (link available soon)! Judges tour each table; keep your demo running."
            />
            
            <ScheduleItem 
              time="3:30 PM"
              title="Science‑Fair‑Style Demos"
              description="5 minutes per team (plus your 1‑minute video). Show off your best work!"
            />
            
            <ScheduleItem 
              time="4:30 PM"
              title="Lightning Talk"
              description="A quick inspo talk to cap the day."
            />
            
            <ScheduleItem 
              time="5:00 PM"
              title="Awards & Closing"
              description="Winners announced—stick around for group photos and celebration."
            />
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