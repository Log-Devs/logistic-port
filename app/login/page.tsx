"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { TruckIcon, LogIn, AlertCircle, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RegisterBackground from "@/public/register-bg.jpg"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Login attempt:", { email, rememberMe })
    } catch (error) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative" style={{ minHeight: '100vh' }}>
        <Image
          src={RegisterBackground}
          alt="Logistics background"
          placeholder="blur"
          className="object-cover object-center w-full h-full absolute inset-0 z-0"
          fill
          sizes="100vw"
          priority
        />

        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-20 px-4">
          {/* Left side: Branding and description with glass effect */}
          <div className="hidden lg:block space-y-6 p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-8">
              <TruckIcon className="h-8 w-8 text-red-400" />
              <h1 className="text-2xl font-bold ml-2 text-slate-100">LogisticsFuture</h1>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-slate-100">
              Efficient Logistics Management<br />
              At Your Fingertips
            </h2>
            <p className="text-lg text-slate-300">
              Secure access to your personal logistics management portal
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <TruckIcon className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-slate-200">Real-time shipment tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-slate-200">Military-grade encryption</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Mail className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-slate-200">Instant notifications</span>
              </div>
            </div>
          </div>

          {/* Right side: Login form with glass effect */}
          <div className="w-full max-w-md mx-auto">
            <Card className="border-0 bg-white/80 backdrop-blur-sm hover:backdrop-blur-md transition-all shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600/20 to-red-400/20 absolute inset-0 -z-10" />
              <CardHeader className="pb-4 px-8 pt-8">
                <CardTitle className="text-3xl font-bold text-center text-slate-800">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-slate-600 mt-2">
                  Sign in to your personal account
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8">
                {error && (
                  <Alert variant="destructive" className="mb-4 bg-red-50/80 backdrop-blur-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-red-600 hover:underline hover:text-red-700"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/70 border-slate-200/80 hover:border-red-200/50 focus:border-red-300/50"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                      className="text-red-600 border-slate-300/80 data-[state=checked]:border-red-600"
                    />
                    <Label htmlFor="remember-me" className="text-sm text-slate-600">
                      Remember me for 30 days
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-red-600/90 hover:bg-red-700/90 transition-all text-white/95 hover:text-white shadow-md hover:shadow-red-300/30"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2 pb-8 px-8">
                <Separator className="my-2 bg-slate-200/80" />
                <div className="text-sm text-center w-full text-slate-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-red-600 hover:underline font-semibold">
                    Create account
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