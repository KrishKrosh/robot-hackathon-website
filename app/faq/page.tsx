"use client"

import Link from "next/link"
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"

// Dynamically import HamburgerMenu
const HamburgerMenu = dynamic(() => import('../../components/HamburgerMenu'), { ssr: false })

// FAQ item component with toggle functionality
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b-2 border-black py-3 select-text">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center w-full text-left select-text"
      >
        <span className="text-base sm:text-lg font-['VCR_OSD_Mono'] tracking-wide">
          {question}
        </span>
        <span className="text-lg sm:text-xl ml-4">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`mt-2 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="pb-2 text-sm sm:text-base font-['VCR_OSD_Mono'] tracking-wide text-gray-800 select-text">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const faqItems = [
    {
      question: "WHAT IS THIS HACKATHON ABOUT?",
      answer: "This hackathon brings together AI enthusiasts and robotics builders to create innovative projects using robot arms. It's a unique opportunity to experiment with cutting-edge technology and take your creation home with you."
    },
    {
      question: "DO I NEED PRIOR ROBOTICS EXPERIENCE?",
      answer: "No, prior robotics experience is not required, but we want exceptional builders. We'll have mentors available to pair with your passion."
    },
    {
      question: "WHAT SHOULD I BRING?",
      answer: "Bring your laptop, and any specific tools you need for your ideas to come to life! We'll provide the robot arms, workspace, meals, and select hardware components. If you need any other hardware, please bring it with you."
    },
    {
      question: "CAN I STAY OVERNIGHT?",
      answer: "No, you will need to make your own arrangements for overnight accommodations."
    },
    {
      question: "WILL I REALLY GET TO KEEP THE ROBOT ARM?",
      answer: "Yes! Each team will get to keep the robot arms they work with during the hackathon, subject to completing the event and submitting a project."
    },
    {
      question: "HOW ARE TEAMS FORMED?",
      answer: "You can come with a pre-formed team (maximum 5 people) or join as an individual and form teams at the event."
    },
    {
      question: "WHAT KIND OF PROJECTS CAN I BUILD?",
      answer: "The possibilities are endless! The only requirement is that your project must use the provided robot arm technology."
    },
    {
      question: "IS THERE A REGISTRATION FEE?",
      answer: "No, participation is free for selected applicants. However, spaces are limited so make sure to apply early through our APPLY link."
    },
    {
      question: "WHAT IF I HAVE MORE QUESTIONS?",
      answer: "Feel free to reach out to krish.mehta@uwaterloo.ca and we'll be happy to answer any additional questions you might have!"
    }
  ]

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
      <HamburgerMenu currentPage="FAQ" isHomePage={false} />
      
      {/* Main content */}
      <div className="pt-16 pb-32 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 pt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-['VCR_OSD_Mono'] tracking-wide text-black border-b-2 border-black pb-4 select-text">
              FREQUENTLY ASKED QUESTIONS
            </h1>
          </div>
          
          {/* FAQ Content */}
          <div className="border-2 border-black bg-white p-4 sm:p-6">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-10 text-center">
            <p className="mb-6 text-base sm:text-lg font-['VCR_OSD_Mono'] tracking-wide select-text">
              READY TO JOIN THE HACKATHON?
            </p>
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