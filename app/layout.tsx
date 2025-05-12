'use client'

import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google"
import "./globals.css"

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <CursorEffect />
          <ScrollProgress />
          {children}
        </Providers>
      </body>
    </html>
  )
}