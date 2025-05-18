"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type AuthContextType = {
	jwt: string | null;
	setJwt: (jwt: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
	const [jwt, setJwt] = useState<string | null>(null);
	const [invalid, setInvalid] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		let token = searchParams.get("jwt");
		// Only allow JWT on /dashboard, /submit-shipment, /awaiting-shipments, /shipment-history, /settings
		const allowedPaths = [
			"/dashboard",
			"/submit-shipment",
			"/awaiting-shipments",
			"/shipment-history",
			"/settings",
		];
		if (token) {
			localStorage.setItem("client_jwt", token);
			setJwt(token);
			// Remove jwt from URL
			const url = new URL(window.location.href);
			url.searchParams.delete("jwt");
			window.history.replaceState({}, "", url.pathname + url.search);
			if (!allowedPaths.includes(url.pathname)) {
				setInvalid(true);
			}
		} else {
			token = localStorage.getItem("client_jwt");
			if (token) setJwt(token);
			else if (
				pathname.startsWith("/client") ||
				allowedPaths.includes(pathname)
			) {
				router.replace("/login");
			}
			if (!allowedPaths.includes(pathname) && pathname.startsWith("/")) {
				setInvalid(true);
			}
		}
	}, [pathname, searchParams, router]);

	if (invalid) {
		// If user is on /dashboard, /settings, etc, show dashboard button. Otherwise, show Home button.
		const isClientRoute = [
			"/dashboard",
			"/submit-shipment",
			"/awaiting-shipments",
			"/shipment-history",
			"/settings",
		].includes(pathname);
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 px-4">
				<div className="bg-white/90 dark:bg-slate-800/90 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md w-full border border-red-100 dark:border-slate-700">
					<svg
						width="64"
						height="64"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="text-red-500 mb-4 animate-bounce"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h1 className="text-3xl font-extrabold mb-2 text-red-600 text-center">
						404 - Page Not Found
					</h1>
					<p className="mb-6 text-gray-600 dark:text-gray-300 text-center text-base md:text-lg">
						The page you are looking for does not exist or you do not have
						access.
						<br />
						{isClientRoute
							? "Please return to your dashboard."
							: "Return to the homepage to continue."}
					</p>
					<button
						onClick={() => {
							setInvalid(false);
							if (isClientRoute) {
								router.push("/dashboard");
							} else {
								router.push("/");
							}
						}}
						className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-semibold text-base md:text-lg shadow hover:bg-red-700 transition mb-2"
					>
						{isClientRoute ? "Return to Dashboard" : "Go to Home"}
					</button>
				</div>
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ jwt, setJwt }}>
			{children}
		</AuthContext.Provider>
	);
}