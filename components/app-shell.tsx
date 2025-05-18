"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import FullPageLoader from "@/components/full-page-loader";
import ModeSwitcher from "@/components/mode-switcher";
import CursorEffect from "@/components/cursor-effect";
import ScrollProgress from "@/components/scroll-progress";

/**
 * AppShell component
 * Responsible for rendering core UI elements and children.
 * All loading UI is now handled globally by AppLoaderWrapper.
 * - Clean code, OOP, and best practices applied.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  // No local loading state. All loading is handled by the global loader.
  // If image preloading is needed for UX, move to a dedicated context/provider (not blocking UI).

  return (
    <>
      {/* Render cursor effect and scroll progress for enhanced UX */}
      <CursorEffect />
      <ScrollProgress />
      {/* Render children content */}
      {children}
    </>
  );
}

