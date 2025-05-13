import Link from "next/link"
import { ArrowRight, Globe, Plane, Ship, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProfessionalHero from "@/components/professional-hero"
import ServiceCard from "@/components/service-card"
import WhyChooseUs from "@/components/why-choose-us"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Import the animation components
import AnimateInView from "@/components/animate-in-view"
import AnimatedButton from "@/components/animated-button"
import AnimatedText from "@/components/animated-text"
import PageTransition from "@/components/page-transition"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {/* Professional Hero Section (replaces the 3D scene) */}
          <ProfessionalHero />

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
                    title="Global Solutions"
                    description="Expert customs brokerage and international logistics management."
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
                    Enter your tracking number to check the status and location of your shipment in real-time.
                    <span className="block mt-2 text-sm">
                      For detailed tracking information and documents, please log in to your account.
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
          <section className="py-20 bg-primary relative overflow-hidden">
            <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left relative z-10">
              <div className="flex-1">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30">
                  <AnimateInView>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">Ready to Transform Your Logistics?</h2>
                  </AnimateInView>
                  <AnimateInView variant="fadeInUp" delay={0.2}>
                    <p className="text-xl mb-8 max-w-[800px] mx-auto md:mx-0 text-white/90">
                      Partner with us for innovative solutions that elevate your supply chain management
                    </p>
                  </AnimateInView>
                  <AnimateInView variant="fadeInUp" delay={0.3}>
                    <AnimatedButton size="lg" variant="secondary" className="bg-white/80 text-red-700 hover:bg-white">
                      <Link href="/contact">Request a Quote</Link>
                    </AnimatedButton>
                  </AnimateInView>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <AnimateInView variant="fadeInUp" delay={0.4}>
                  <div className="relative w-full max-w-xs md:max-w-sm aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white/20">
                    <img
                      src="/delivery.jpg"
                      alt="Professional logistics delivery"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </AnimateInView>
              </div>
            </div>
            {/* Optional: subtle pattern overlay for extra polish */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 pointer-events-none" />
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}