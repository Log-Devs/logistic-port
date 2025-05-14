"use client"
import { useEffect } from "react";

// List your public media files here (relative to /public)
const MEDIA_FILES = [
	"/deliver-man.jpg",
	"/delivery.jpg",
	"/deliveryparcel.jpg",
	"/industrial-port-container-yard.jpg",
	"/login.jpg",
	"/notes-warehouse.jpg",
	"/parcel.jpg",
	"/placeholder-logo.png",
	"/placeholder-logo.svg",
	// Add more as needed
];

const CACHE_NAME = "media-cache-v1";

export default function usePreloadMedia() {
	useEffect(() => {
		if (typeof window === "undefined" || !("caches" in window)) return;
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			await Promise.all(
				MEDIA_FILES.map(async (url) => {
					const cached = await cache.match(url);
					if (!cached) {
						try {
							await cache.add(url);
						} catch (e) {
							// Ignore fetch errors (e.g., file not found)
						}
					}
				})
			);
		})();
	}, []);
}
