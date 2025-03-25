"use client"

import Link from "next/link"

interface BreadcrumbNavProps {
  currentPage: string;
  isMenuOpen?: boolean;
}

export default function BreadcrumbNav({ currentPage, isMenuOpen = false }: BreadcrumbNavProps) {
  return (
    <div className={`fixed top-0 left-0 right-0 bg-[#f5f5f5] border-b-2 border-black z-40 transition-opacity duration-300 ${
      isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-xs sm:text-sm md:text-base font-['VCR_OSD_Mono'] tracking-wide flex items-center py-4">
          <Link href="/" className="hover:underline">[ HOME ]</Link> 
          <span className="mx-2">/</span> 
          <span>[ {currentPage} ]</span>
        </div>
      </div>
    </div>
  )
} 