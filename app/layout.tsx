import "./globals.css";
import { Inter } from "next/font/google";
import AppShell from "@/components/app-shell";
import AppLoaderWrapper from "@/components/AppLoaderWrapper";
import PreloadMediaProvider from "@/components/PreloadMediaProvider";
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";
import ChatbotButtonWrapper from "@/components/ChatbotButtonWrapper";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/components/auth-context";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={inter.className + " bg-white dark:bg-slate-900"}>
        <Analytics />
        <AuthProvider>
          <PreloadMediaProvider>
            <AppLoaderWrapper>
              <AppShell>{children}</AppShell>
              <CookieConsentBanner />
              {/* Use the client-side wrapped component */}
              <ChatbotButtonWrapper />
            </AppLoaderWrapper>
          </PreloadMediaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
