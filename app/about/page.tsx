import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Clock, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About LogisticsFuture</h1>
                <p className="text-muted-foreground text-lg">
                  We're revolutionizing the logistics industry with cutting-edge technology and a commitment to
                  excellence.
                </p>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image src="/placeholder.svg" alt="Logistics operations" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card className="border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To transform global logistics through innovative technology, sustainable practices, and exceptional
                    service, creating seamless connections across the world's supply chains.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To be the global leader in logistics innovation, setting new standards for efficiency, reliability,
                    and customer experience in freight transportation and supply chain management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Core Values</h2>
              <p className="text-muted-foreground mt-4 max-w-[800px] mx-auto">
                These principles guide everything we do and define our approach to logistics excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly seek new ways to improve and revolutionize logistics processes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Reliability</h3>
                  <p className="text-muted-foreground">
                    We deliver on our promises, ensuring consistent and dependable service.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to environmentally responsible logistics solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for the highest standards in every aspect of our operations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative border-l border-border pl-6 space-y-12 max-w-[800px] mx-auto">
              <div className="relative">
                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div>
                  <h3 className="text-xl font-bold">2023</h3>
                  <p className="text-muted-foreground mt-2">
                    Founded with a vision to revolutionize logistics through technology and innovation.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div>
                  <h3 className="text-xl font-bold">2024</h3>
                  <p className="text-muted-foreground mt-2">
                    Expanded operations to cover major global trade routes and established key partnerships.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div>
                  <h3 className="text-xl font-bold">2025</h3>
                  <p className="text-muted-foreground mt-2">
                    Launched our proprietary logistics platform with AI-powered route optimization and real-time
                    tracking.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] mt-1.5 h-4 w-4 rounded-full border border-primary bg-background"></div>
                <div>
                  <h3 className="text-xl font-bold">Future</h3>
                  <p className="text-muted-foreground mt-2">
                    Continuing to innovate and expand our global network while maintaining our commitment to excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us on Our Journey</h2>
            <p className="text-xl mb-8 max-w-[800px] mx-auto text-primary-foreground/90">
              Experience the future of logistics with our innovative solutions
            </p>
            <Button size="lg" variant="secondary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
