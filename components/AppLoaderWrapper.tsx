"use client";
import FullPageLoader from "@/components/full-page-loader";
import { useEffect, useState } from "react";

export default function AppLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cleanupFns: (() => void)[] = [];
    function checkImages() {
      const images = Array.from(document.images);
      if (images.length === 0) {
        setLoaded(true);
        return;
      }
      let loadedCount = 0;
      function onImgLoad(this: HTMLImageElement) {
        loadedCount++;
        this.removeEventListener("load", onImgLoad);
        this.removeEventListener("error", onImgLoad);
        if (loadedCount === images.length) setLoaded(true);
      }
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener("load", onImgLoad);
          img.addEventListener("error", onImgLoad);
          // No additional cleanup needed for this image, as onImgLoad handles it.
        }
      });
      if (loadedCount === images.length) setLoaded(true);
    }
    if (document.readyState === "complete") {
      checkImages();
    } else {
      window.addEventListener("DOMContentLoaded", checkImages);
      cleanupFns.push(() =>
        window.removeEventListener("DOMContentLoaded", checkImages)
      );
    }
    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      {!loaded && <FullPageLoader />}
      <div style={{ display: loaded ? undefined : "none" }}>{children}</div>
    </>
  );
}
