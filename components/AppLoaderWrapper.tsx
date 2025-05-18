"use client";
import FullPageLoader from "@/components/full-page-loader";
import { useEffect, useState } from "react";

export default function AppLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <FullPageLoader loading={loading} />
      <div style={{ display: loading ? "none" : undefined }}>{children}</div>
    </>
  );
}
