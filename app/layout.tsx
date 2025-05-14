import "./globals.css";
import { Inter } from "next/font/google";
import AppShell from "@/components/app-shell";
import AppLoaderWrapper from "@/components/AppLoaderWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={inter.className + " bg-white dark:bg-slate-900"}>
        <AppLoaderWrapper>
          <AppShell>{children}</AppShell>
        </AppLoaderWrapper>
      </body>
    </html>
  );
}
