"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Mail, MapPin, Phone } from "lucide-react"
import ContactMap from "@/components/contact-map"

// Add these imports at the top
import { motion } from "framer-motion"
import AnimateInView from "@/components/animate-in-view"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormState({
      ...formState,
      service: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formState)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormState({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    })
  }

  // Replace the return statement with this enhanced version
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {/* Hero Section */}
          <section className="relative py-20 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="text-center max-w-[800px] mx-auto">
                <AnimateInView>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.2}>
                  <p className="text-muted-foreground text-lg mt-4">
                    Get in touch with our team to discuss your logistics needs or request a quote.
                  </p>
                </AnimateInView>
              </div>
            </div>
          </section>

          {/* Contact Form and Info */}
          <section className="py-20">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 lg:grid-cols-2">
                <AnimateInView variant="fadeInLeft">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Us a Message</CardTitle>
                      <CardDescription>
                        Fill out the form below and we'll get back to you as soon as possible.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              required
                              value={formState.name}
                              onChange={handleChange}
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              required
                              value={formState.email}
                              onChange={handleChange}
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                            />
                          </motion.div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              name="company"
                              placeholder="Your Company"
                              value={formState.company}
                              onChange={handleChange}
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Label htmlFor="service">Service Interested In</Label>
                            <Select value={formState.service} onValueChange={handleSelectChange}>
                              <SelectTrigger
                                id="service"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                              >
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="air-freight">Air Freight</SelectItem>
                                <SelectItem value="ocean-freight">Ocean Freight</SelectItem>
                                <SelectItem value="land-freight">Land Freight</SelectItem>
                                <SelectItem value="customs-brokerage">Customs Brokerage</SelectItem>
                                <SelectItem value="warehousing">Warehousing & Distribution</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>
                        </div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your logistics needs..."
                            required
                            className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                            value={formState.message}
                            onChange={handleChange}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <AnimatedButton type="submit" className="w-full">
                            Send Message
                          </AnimatedButton>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </AnimateInView>

                <div className="space-y-8">
                  <AnimateInView variant="fadeInRight">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Reach out to us directly through any of these channels.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div
                          className="flex items-start"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Address</h3>
                            <p className="text-muted-foreground">
                              123 Logistics Way
                              <br />
                              Future City, FC 12345
                              <br />
                              United States
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-start"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Phone className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Phone</h3>
                            <p className="text-muted-foreground">
                              Main: (123) 456-7890
                              <br />
                              Support: (123) 456-7891
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-start"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Mail className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-muted-foreground">
                              General: info@logisticsfuture.com
                              <br />
                              Support: support@logisticsfuture.com
                              <br />
                              Sales: sales@logisticsfuture.com
                            </p>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </AnimateInView>

                  <AnimateInView variant="fadeInRight" delay={0.2}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Office Location</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[300px] p-0 overflow-hidden rounded-b-lg">
                        <ContactMap />
                      </CardContent>
                    </Card>
                  </AnimateInView>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <AnimateInView>
                  <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                </AnimateInView>
                <AnimateInView variant="fadeInUp" delay={0.2}>
                  <p className="text-muted-foreground mt-4 max-w-[800px] mx-auto">
                    Find quick answers to common questions about our services.
                  </p>
                </AnimateInView>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "How do I get a quote?",
                    content:
                      "You can request a quote by filling out our contact form, calling our sales team, or emailing sales@logisticsfuture.com with details about your shipment.",
                  },
                  {
                    title: "What information do I need for a quote?",
                    content:
                      "To provide an accurate quote, we need origin and destination locations, cargo dimensions and weight, commodity type, and desired delivery timeframe.",
                  },
                  {
                    title: "How can I track my shipment?",
                    content:
                      "Once your shipment is booked, you'll receive a tracking number that you can use on our website or by logging into your customer portal.",
                  },
                  {
                    title: "Do you handle international shipments?",
                    content:
                      "Yes, we specialize in global logistics and can handle shipments to and from over 150 countries worldwide.",
                  },
                  {
                    title: "What are your payment terms?",
                    content:
                      "We offer flexible payment options including credit terms for established clients and credit card payments for new customers.",
                  },
                  {
                    title: "Can you handle dangerous goods?",
                    content:
                      "Yes, we are certified to transport dangerous goods across all modes of transportation, following strict international regulations.",
                  },
                ].map((faq, index) => (
                  <AnimateInView key={index} variant="fadeInUp" delay={0.1 * index}>
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">{faq.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{faq.content}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimateInView>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6 text-center">
              <AnimateInView>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              </AnimateInView>
              <AnimateInView variant="fadeInUp" delay={0.2}>
                <p className="text-xl mb-8 max-w-[800px] mx-auto text-primary-foreground/90">
                  Our team is ready to help you with your logistics needs. Contact us today for a personalized solution.
                </p>
              </AnimateInView>
              <AnimateInView variant="fadeInUp" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton size="lg" variant="secondary">
                    <Link href="/contact">Request a Quote</Link>
                  </AnimatedButton>
                  <AnimatedButton
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    <Link href="/services">Explore Services</Link>
                  </AnimatedButton>
                </div>
              </AnimateInView>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
