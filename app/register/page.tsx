"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { TruckIcon, UserPlus, Lock, Mail, User, Phone, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+233",
    accountType: "individual",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    marketingConsent: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePhoneCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value
    let number = formData.phone.replace(/^\+233|^\+1/, "")
    setFormData((prev) => ({ ...prev, phone: code + number }))
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = formData.phone.startsWith("+233") ? "+233" : "+1"
    setFormData((prev) => ({ ...prev, phone: code + e.target.value.replace(/[^0-9]/g, "") }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!formData.agreeTerms) {
      setError("You must accept the Terms of Service to continue")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Registration successful! (Simulation)")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative" style={{ minHeight: '100vh' }}>
        <Image
          src="/deliveryparcel.jpg"
          alt="Logistics background"
          className="object-cover object-center w-full h-full absolute inset-0 z-0"
          fill
          sizes="100vw"
          priority
        />

        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-20 px-4">
          {/* Left side: Branding with glass effect */}
          <div className="hidden lg:block space-y-6 p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-8">
              <TruckIcon className="h-8 w-8 text-red-400" />
              <h1 className="text-2xl font-bold ml-2 text-slate-100">LogisticsFuture</h1>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-slate-100">
              Streamline Your Personal<br />
              Logistics Management
            </h2>
            <p className="text-lg text-slate-300">
              Fast, reliable, and secure personal logistics solutions
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-slate-200">End-to-end encrypted communications</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Phone className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-slate-200">Multi-country phone support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <User className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-slate-200">Personal account management</span>
              </div>
            </div>
          </div>

          {/* Right side: Registration form with glass effect */}
          <div className="w-full max-w-md mx-auto">
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:backdrop-blur-md transition-all shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600/20 to-red-400/20 absolute inset-0 -z-10" />
              <CardHeader className="pb-4 px-8 pt-8">
                <CardTitle className="text-3xl font-bold text-center text-slate-800">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center text-slate-600 mt-2">
                  Get started with your personal account
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8">
                {error && (
                  <Alert variant="destructive" className="mb-4 bg-red-50/80 backdrop-blur-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-slate-700">First Name *</Label>
                      <Input
                        id="first-name"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-slate-700">Last Name *</Label>
                      <Input
                        id="last-name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                    <div className="flex gap-2">
                      <select
                        id="country-code"
                        className="h-10 rounded-md border border-slate-200/80 bg-white/70 px-3 text-slate-700 hover:border-red-200/50 focus:border-red-300/50"
                        value={formData.phone.startsWith('+233') ? '+233' : '+1'}
                        onChange={handlePhoneCodeChange}
                        style={{ minWidth: 100 }}
                      >
                        <option value="+233">🇬🇭 +233</option>
                        <option value="+1">🇺🇸 +1</option>
                      </select>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="flex-1 bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                        value={formData.phone.replace(/^\+233|^\+1/, '')}
                        onChange={handlePhoneNumberChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-slate-700">Confirm Password *</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: !!checked }))}
                        className="mt-1 text-red-600 border-slate-300/80 data-[state=checked]:border-red-600"
                      />
                      <Label htmlFor="terms" className="text-sm text-slate-600">
                        I agree to the {' '}
                        <Link href="/terms" className="text-red-600 hover:underline font-medium">
                          Terms of Service
                        </Link> *
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-red-600/90 hover:bg-red-700/90 transition-all text-white/95 hover:text-white shadow-md hover:shadow-red-300/30"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Create Account
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2 pb-8 px-8">
                <Separator className="my-2 bg-slate-200/80" />
                <div className="text-sm text-center w-full text-slate-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-red-600 hover:underline font-semibold">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}