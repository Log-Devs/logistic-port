"use client";
import FullPageLoader from "@/components/full-page-loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AppLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <>
      <FullPageLoader loading={loading} />
      <div style={{ display: loading ? "none" : undefined }}>{children}</div>
    </>
  );
}
