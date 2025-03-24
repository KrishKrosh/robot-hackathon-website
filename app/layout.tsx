import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { PostHogProvider } from "../components/PostHogProvider"

export const metadata: Metadata = {
  title: "Robot Arm Hackathon",
  description: "We're hosting an AI + Robot Arm hackathon for the best builders in NYC, April 19-20 2025. Dive into the world of robotics and build something amazing with robot arms.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f5f5f5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          href="https://fonts.cdnfonts.com/css/vcr-osd-mono"
          rel="stylesheet"
        />
      </head>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}

import './globals.css'
