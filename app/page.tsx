import Link from "next/link"
import { ArrowRight, Globe, Plane, Ship, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import HeroScene from "@/components/hero-scene"
import ServiceCard from "@/components/service-card"
import WhyChooseUs from "@/components/why-choose-us"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Import the new animation components at the top of the file
import AnimateInView from "@/components/animate-in-view"
import AnimatedButton from "@/components/animated-button"
import AnimatedText from "@/components/animated-text"
import PageTransition from "@/components/page-transition"

// Replace the existing export default function with this enhanced version
export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {/* Hero Section */}
          <section className="relative h-[80vh] w-full overflow-hidden">
            <HeroScene />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container px-4 md:px-6 z-10 text-center">
                <AnimatedText className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white drop-shadow-md">
                  Next-Generation Logistics Solutions
                </AnimatedText>
                <AnimateInView variant="fadeInUp" delay={0.2}>
                  <p className="text-xl md:text-2xl text-white/90 max-w-[800px] mx-auto mb-8 drop-shadow-md">
                    Transforming global freight with cutting-edge technology and unparalleled service
                  </p>
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedButton size="lg" className="bg-primary hover:bg-primary/90">
                      Track Your Shipment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                    <AnimatedButton
                      size="lg"
                      variant="outline"
                      className="bg-background/20 backdrop-blur-sm text-white border-white/20 hover:bg-background/30"
                    >
                      Explore Services
                    </AnimatedButton>
                  </div>
                </AnimateInView>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
              <AnimateInView>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
              </AnimateInView>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimateInView variant="fadeInUp" delay={0.1}>
                  <ServiceCard
                    icon={<Plane className="h-10 w-10" />}
                    title="Air Freight"
                    description="Fast and reliable air transportation solutions for time-sensitive cargo."
                  />
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.2}>
                  <ServiceCard
                    icon={<Ship className="h-10 w-10" />}
                    title="Ocean Freight"
                    description="Cost-effective shipping solutions for large volume cargo across global waters."
                  />
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.3}>
                  <ServiceCard
                    icon={<Truck className="h-10 w-10" />}
                    title="Land Freight"
                    description="Efficient ground transportation with extensive network coverage."
                  />
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.4}>
                  <ServiceCard
                    icon={<Globe className="h-10 w-10" />}
                    title="Customs Brokerage"
                    description="Expert handling of customs documentation and regulatory compliance."
                  />
                </AnimateInView>
              </div>
              <AnimateInView variant="fadeInUp" delay={0.5}>
                <div className="text-center mt-12">
                  <AnimatedButton asChild>
                    <Link href="/services">View All Services</Link>
                  </AnimatedButton>
                </div>
              </AnimateInView>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6">
              <AnimateInView>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
              </AnimateInView>
              <WhyChooseUs />
            </div>
          </section>

          {/* Tracking Portal */}
          <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
              <div className="max-w-[800px] mx-auto text-center">
                <AnimateInView>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Track Your Shipment</h2>
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.2}>
                  <p className="text-muted-foreground mb-8">
                    Enter your tracking number to check the status of your shipment.
                    <span className="block mt-2 text-sm">
                      Note: Detailed location information requires login. Public tracking shows high-level status only.
                    </span>
                  </p>
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-[600px] mx-auto">
                    <Input type="text" placeholder="Enter tracking number" className="flex-1" />
                    <AnimatedButton>Track Now</AnimatedButton>
                  </div>
                </AnimateInView>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6 text-center">
              <AnimateInView>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Logistics?</h2>
              </AnimateInView>
              <AnimateInView variant="fadeInUp" delay={0.2}>
                <p className="text-xl mb-8 max-w-[800px] mx-auto text-primary-foreground/90">
                  Join the future of freight management with our innovative solutions
                </p>
              </AnimateInView>
              <AnimateInView variant="fadeInUp" delay={0.3}>
                <AnimatedButton size="lg" variant="secondary">
                  <Link href="/contact">Get a Quote</Link>
                </AnimatedButton>
              </AnimateInView>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
