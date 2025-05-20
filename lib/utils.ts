import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for shipment forms

export function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, 'ig');
  return text.split(regex).map((part, i) =>
	regex.test(part)
	  ? `<span style="font-weight:bold; background:#e0e7ff;">${part}</span>`
	  : part
  ).join('');
}

export async function reverseGeocode(lat: number, lon: number) {
	const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
	const res = await fetch(url);
	const data = await res.json();
	return data.address || {};
}
