"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "./auth-context";
import { jwtDecode } from "jwt-decode";

export default function ClientHeader() {
	const { jwt, setJwt } = useAuth();
	let userName = "";
	if (jwt) {
		try {
			const decoded: any = jwtDecode(jwt);
			userName = decoded.name || decoded.sub || "User";
		} catch (e) {
			userName = "User";
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("client_jwt");
		setJwt(null);
		window.location.href = "/login";
	};

	return (
		<header className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
			<div className="font-bold text-lg">Client Portal</div>
			<nav className="flex items-center gap-4">
				{jwt && <span className="text-sm text-slate-700 dark:text-slate-200">Hello, {userName}</span>}
				<Link href="/settings" className="text-sm hover:underline">Settings</Link>
				{jwt && (
					<button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
				)}
			</nav>
		</header>
	);
}