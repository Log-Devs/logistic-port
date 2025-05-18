"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ClientHeader() {
	const { user, logout } = useAuth();
	const { toast } = useToast();

	const handleLogout = async () => {
		await logout();
		toast({ title: "Logged out", description: "You have been logged out successfully." });
	};

	return (
		<header className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
			<div className="font-bold text-lg">Client Portal</div>
			<nav className="flex items-center gap-4">
				{user && <span className="text-sm text-slate-700 dark:text-slate-200">Hello, {user.name}</span>}
				<Link href="/settings" className="text-sm hover:underline">Settings</Link>
				{user && (
					<Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-200 dark:border-red-400">Logout</Button>
				)}
			</nav>
		</header>
	);
}
