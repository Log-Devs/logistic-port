import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowRight, Globe, Plane, Ship, Truck } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-[800px] mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
              <p className="text-muted-foreground text-lg mt-4">
                Comprehensive logistics solutions designed to meet your global freight needs with efficiency and
                reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Air Freight */}
        <section id="air" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Plane className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Air Freight</h2>
                <p className="text-muted-foreground">
                  Fast and reliable air transportation solutions for time-sensitive cargo. Our global network of airline
                  partners ensures your shipments reach their destination on schedule, every time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Express air freight for urgent deliveries</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Consolidated air freight for cost efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Charter services for oversized or specialized cargo</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Temperature-controlled solutions for sensitive goods</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image src="/placeholder.svg" alt="Air freight operations" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Ocean Freight */}
        <section id="ocean" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden order-last lg:order-first">
                <Image src="/placeholder.svg" alt="Ocean freight operations" fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Ship className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Ocean Freight</h2>
                <p className="text-muted-foreground">
                  Cost-effective shipping solutions for large volume cargo across global waters. Our extensive network
                  of ocean carriers provides reliable and efficient transportation for your goods.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Full Container Load (FCL) services</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Less than Container Load (LCL) consolidation</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Break bulk and project cargo handling</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Dangerous goods transportation with proper certification</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Land Freight */}
        <section id="land" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Land Freight</h2>
                <p className="text-muted-foreground">
                  Efficient ground transportation with extensive network coverage. Our land freight services connect
                  major cities and remote locations with reliability and precision.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Full Truckload (FTL) services</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Less than Truckload (LTL) for smaller shipments</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Intermodal transportation solutions</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Specialized equipment for oversized or heavy cargo</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <Image src="/placeholder.svg" alt="Land freight operations" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Customs Brokerage */}
        <section id="customs" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden order-last lg:order-first">
                <Image src="/placeholder.svg" alt="Customs brokerage operations" fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Customs Brokerage</h2>
                <p className="text-muted-foreground">
                  Expert handling of customs documentation and regulatory compliance. Our customs brokerage services
                  ensure smooth clearance of your goods across international borders.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Customs documentation preparation and filing</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Tariff classification and duty calculation</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Regulatory compliance consulting</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Trade agreement and free trade zone expertise</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Additional Services</h2>
              <p className="text-muted-foreground mt-4 max-w-[800px] mx-auto">
                Complementary solutions to enhance your logistics experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Warehousing & Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Strategic storage solutions with efficient distribution networks to optimize your supply chain.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Consulting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Expert analysis and optimization strategies to improve your logistics operations.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cargo Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Comprehensive coverage options to protect your valuable shipments during transit.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Logistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Specialized handling for complex, oversized, or high-value project cargo.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dangerous Goods Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Certified transportation of hazardous materials with strict adherence to safety regulations.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Digital Tracking Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Advanced tracking technology providing real-time visibility of your shipments.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Logistics?</h2>
            <p className="text-xl mb-8 max-w-[800px] mx-auto text-primary-foreground/90">
              Contact our team today to discuss your specific requirements and discover how our services can benefit
              your business.
            </p>
            <Button size="lg" variant="secondary">
              <Link href="/contact">Get a Customized Quote</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
