import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              HackEvent 2025
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join us for 48 hours of coding, creativity, and collaboration
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold">April 15-17, 2025</p>
            <p className="text-lg">Tech University Campus</p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">Register Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

