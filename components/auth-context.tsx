"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export type User = { name: string; email?: string;[key: string]: any } | null;

interface AuthContextType {
	user: User;
	loading: boolean;
	login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	// Hydrate user from /api/auth/me
	useEffect(() => {
		async function fetchUser() {
			setLoading(true);
			try {
				const res = await fetch("/api/auth/me", { credentials: "include" });
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
				} else {
					setUser(null);
				}
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		}
		fetchUser();
	}, []);

	// Login: call API, update user state
	const login = async (email: string, password: string, rememberMe: boolean) => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ email, password, rememberMe }),
			});
			if (res.ok) {
				// Get user info after login
				const me = await fetch("/api/auth/me", { credentials: "include" });
				if (me.ok) {
					const data = await me.json();
					setUser(data.user);
					setLoading(false);
					return true;
				}
			}
			setUser(null);
			setLoading(false);
			return false;
		} catch {
			setUser(null);
			setLoading(false);
			return false;
		}
	};

	// Logout: call API, clear user state
	const logout = async () => {
		setLoading(true);
		await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
		setUser(null);
		setLoading(false);
		router.push("/");
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
