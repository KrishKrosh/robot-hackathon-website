"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Only prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      // Only disable scrolling on the body temporarily when menu is open
      document.body.style.overflow = "hidden"
    } else {
      // Important: Re-enable scrolling when menu is closed
      document.body.style.overflow = "auto"
      document.body.style.position = "static"
      document.body.style.height = "auto"
      document.documentElement.style.overflow = "auto"
    }
    
    return () => {
      // Important: Make sure scrolling is restored when component unmounts
      document.body.style.overflow = "auto"
      document.body.style.position = "static"
      document.body.style.height = "auto"
      document.documentElement.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div className="menu-container z-50">
      {/* Hamburger Icon - Only visible when menu is closed */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-2 sm:top-4 right-3 sm:right-6 z-50 w-8 h-8 flex flex-col justify-center items-center gap-1 bg-transparent border-2 border-black rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Open menu"
        >
          <div className="w-4 h-0.5 bg-black"></div>
          <div className="w-4 h-0.5 bg-black"></div>
          <div className="w-4 h-0.5 bg-black"></div>
        </button>
      )}

      {/* Menu Overlay - Added direct click handler to close the menu */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      ></div>

      {/* Menu Panel */}
      <div 
        className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-[#f5f5f5] z-40 border-l-2 border-black transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col overflow-y-auto`}
        aria-hidden={!isOpen}
        onClick={(e) => e.stopPropagation()} // Stop clicks from reaching the overlay
      >
        {/* Header with Menu text and X button */}
        <div className="border-b-2 border-black flex justify-between items-center">
          <div className="py-4 px-6 font-['VCR_OSD_Mono'] tracking-wide text-black text-lg">
            [ MENU ]
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-12 h-12 flex justify-center items-center border-l-2 border-black"
            aria-label="Close menu"
          >
            <div className="relative w-5 h-5">
              <div className="absolute top-1/2 left-0 w-5 h-0.5 bg-black transform -translate-y-1/2 rotate-45"></div>
              <div className="absolute top-1/2 left-0 w-5 h-0.5 bg-black transform -translate-y-1/2 -rotate-45"></div>
            </div>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col">
          <Link 
            href="/" 
            className="px-6 py-4 font-['VCR_OSD_Mono'] tracking-wide text-black text-xl border-b border-black hover:bg-black hover:bg-opacity-5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link 
            href="/about" 
            className="px-6 py-4 font-['VCR_OSD_Mono'] tracking-wide text-black text-xl border-b border-black hover:bg-black hover:bg-opacity-5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ABOUT
          </Link>
          <Link 
            href="/faq" 
            className="px-6 py-4 font-['VCR_OSD_Mono'] tracking-wide text-black text-xl border-b border-black hover:bg-black hover:bg-opacity-5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            href="/prizes" 
            className="px-6 py-4 font-['VCR_OSD_Mono'] tracking-wide text-black text-xl border-b border-black hover:bg-black hover:bg-opacity-5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            PRIZES
          </Link>
          <Link 
            href="https://lu.ma/z29r63z9" 
            className="px-6 py-4 font-['VCR_OSD_Mono'] tracking-wide text-black text-xl border-b border-black hover:bg-black hover:bg-opacity-5 transition-colors"
            onClick={() => setIsOpen(false)}
            target="_blank" 
            rel="noopener noreferrer"
          >
            APPLY
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-6 py-4 border-t border-black">
          <div className="font-['VCR_OSD_Mono'] tracking-wide text-sm text-black text-opacity-60">
            APRIL 19 & 20TH<br />
            MEATPACKING DISTRICT, NYC
          </div>
        </div>
      </div>
    </div>
  )
} 