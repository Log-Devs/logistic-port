"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchWithFallback } from "@/components/lib/api";

// Dummy user object for fallback (for development/testing only)
const DUMMY_USER = {
  name: "Test User",
  email: "test@example.com",
  verified: true,
};

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
  // Hydrate user state from /api/auth/me ONLY. Do NOT fallback to dummy user for hydration.
  // This ensures authentication is session-specific and not global.
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        // Only hydrate from real API; do not fallback to dummy user!
        const data = await fetchWithFallback<{ user: User }>(
          "/api/auth/me",
          { credentials: "include" }
        );
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

	// Login: call API, update user state
  /**
   * Handles user login by calling the API with fallback to dummy data.
   * Updates user state accordingly.
   * @param email - User email
   * @param password - User password
   * @param rememberMe - Remember me flag
   * @returns {Promise<boolean>} - True if login succeeded, false otherwise
   */
  /**
   * Handles user login. Attempts real API login, but allows dummy login fallback
   * ONLY if credentials match known dummy credentials and only in development.
   * This ensures fallback is never used for arbitrary users or in production.
   */
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    setLoading(true);
    try {
      // Attempt real API login
      await fetchWithFallback(
        "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password, rememberMe }),
        }
      );
      // On success, hydrate user from API
      const data = await fetchWithFallback<{ user: User }>(
        "/api/auth/me",
        { credentials: "include" }
      );
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err) {
      // Only allow dummy fallback login if:
      // 1. The explicit env flag is set (NEXT_PUBLIC_ENABLE_DUMMY_LOGIN)
      // 2. Credentials match the known dummy credentials
      const enableDummyLogin = process.env.NEXT_PUBLIC_ENABLE_DUMMY_LOGIN === "true";
      const isDummyCreds = email === DUMMY_USER.email && password === "password123";
      if (enableDummyLogin && isDummyCreds) {
        setUser(DUMMY_USER);
        setLoading(false);
        return true;
      }
      setUser(null);
      setLoading(false);
      return false;
    }
  };


	// Logout: call API, clear user state
  /**
   * Handles user logout by calling the API with fallback.
   * Clears user state and redirects to home.
   */
  const logout = async () => {
    setLoading(true);
    try {
      // Use fetchWithFallback for logout API call
      await fetchWithFallback(
        "/api/auth/logout",
        { method: "POST", credentials: "include" },
        {} // fallback: no-op for logout
      );
    } finally {
      setUser(null);
      setLoading(false);
      router.push("/");
    }
  };


	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
