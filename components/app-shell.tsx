"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import FullPageLoader from "@/components/full-page-loader";
import ModeSwitcher from "@/components/mode-switcher";
import CursorEffect from "@/components/cursor-effect";
import ScrollProgress from "@/components/scroll-progress";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

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
    ];
    let loaded = 0;
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      if (img.complete) {
        loaded++;
        if (loaded === images.length) setLoading(false);
      } else {
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === images.length) setLoading(false);
        };
      }
      img.src = src;
    });
    // Fallback: hide loader after 3s if images are slow
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading && (
        <FullPageLoader loading={loading} />
      )}
      {!loading && (
        <>
          <CursorEffect />
          <ScrollProgress />
          {children}
        </>
      )}
    </>
  );
}
