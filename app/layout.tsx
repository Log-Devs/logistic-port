'use client'

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../components/theme-provider";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google"
import "./globals.css"
import FullPageLoader from "@/components/full-page-loader"
import ModeSwitcher from "@/components/mode-switcher"

const inter = Inter({ subsets: ["latin"] })

// Client-only components
const CursorEffect = dynamic(() => import("../components/cursor-effect"), {
  ssr: false
})
const ScrollProgress = dynamic(() => import("../components/scroll-progress"), {
  ssr: false
})

// Client-side providers component
function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Preload all key images and assets
    const images = [
      "/deliveryparcel.jpg",
      "/industrial-port-container-yard.jpg",
      "/register-bg.jpg",
      "/warehouse.jpg",
      "/delivery.jpg",
      "/rider.jpg",
      "/vehicles.jpg",
      "/notes-warehouse.jpg",
      "/parcel.jpg",
      "/shipment.jpg",
      "/placeholder-logo.png",
      "/placeholder-user.jpg",
      // ...add more as needed
    ]
    let loaded = 0
    images.forEach((src) => {
      const img = new window.Image()
      img.src = src
      img.onload = img.onerror = () => {
        loaded++
        if (loaded === images.length) setLoading(false)
      }
    })
    // Fallback: hide loader after 3s if images are slow
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModeSwitcher />
          {loading && <FullPageLoader />}
          {!loading && (
            <Providers>
              <CursorEffect />
              <ScrollProgress />
              {children}
            </Providers>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}