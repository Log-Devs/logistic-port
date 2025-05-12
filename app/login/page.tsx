"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoginScene from "@/components/login-scene"

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle user login here
    console.log("User login:", { email: userEmail, password: userPassword })
    alert("User login functionality would be implemented in a real application")
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle admin login here
    console.log("Admin login:", { email: adminEmail, password: adminPassword })
    alert("Admin login functionality would be implemented in a real application")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container relative h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
            <div className="absolute inset-0 bg-zinc-900">
              <LoginScene />
            </div>
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              LogisticsFuture
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  "LogisticsFuture has revolutionized our supply chain with their innovative technology and reliable
                  service."
                </p>
                <footer className="text-sm">Sofia Davis, Logistics Manager at TechCorp</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8 flex items-center justify-center h-full">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">Sign in to your account to access your dashboard</p>
              </div>
              <Tabs defaultValue="user" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">User</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="user">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Login</CardTitle>
                      <CardDescription>Access your shipment tracking and account information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <form onSubmit={handleUserLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                              id="user-email"
                              type="email"
                              placeholder="name@example.com"
                              required
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="user-password">Password</Label>
                              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                Forgot password?
                              </Link>
                            </div>
                            <Input
                              id="user-password"
                              type="password"
                              required
                              value={userPassword}
                              onChange={(e) => setUserPassword(e.target.value)}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Sign In
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <div className="text-sm text-muted-foreground text-center">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline">
                          Sign up
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="admin">
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Login</CardTitle>
                      <CardDescription>Access the administrative dashboard and management tools</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <form onSubmit={handleAdminLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="admin-email">Email</Label>
                            <Input
                              id="admin-email"
                              type="email"
                              placeholder="admin@example.com"
                              required
                              value={adminEmail}
                              onChange={(e) => setAdminEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="admin-password">Password</Label>
                              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                Forgot password?
                              </Link>
                            </div>
                            <Input
                              id="admin-password"
                              type="password"
                              required
                              value={adminPassword}
                              onChange={(e) => setAdminPassword(e.target.value)}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Sign In
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted-foreground text-center w-full">
                        Admin access is restricted to authorized personnel only.
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
