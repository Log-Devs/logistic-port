"use client";
import FullPageLoader from "@/components/full-page-loader";
import { useEffect, useState } from "react";

/**
 * AppLoaderWrapper component
 * Wraps the application and displays a global loader based on the loading state from AuthProvider.
 * - Clean code, OOP, and best practices applied.
 */
import { useAuth } from "@/components/auth-context";

export default function AppLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the global loading state from AuthProvider
  const { loading } = useAuth();

  return (
    <>
      {/* Display the global loader only when loading is true */}
      <FullPageLoader loading={loading} />
      {/* Hide children content while loading */}
      <div style={{ display: loading ? "none" : undefined }}>{children}</div>
    </>
  );
}

