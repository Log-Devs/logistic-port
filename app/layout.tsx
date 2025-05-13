import "./globals.css"
import { Inter } from "next/font/google"
import AppShell from "@/components/app-shell"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html >
  )
}