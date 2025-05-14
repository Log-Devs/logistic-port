"use client";
import usePreloadMedia from "@/hooks/use-preload-media";

export default function PreloadMediaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  usePreloadMedia();
  return <>{children}</>;
}
