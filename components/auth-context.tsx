"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchWithFallback } from "@/components/lib/api";
// Import js-cookie for cookie management (ensure 'js-cookie' is installed)
import Cookies from "js-cookie";

// Dummy users for fallback (for development/testing only)
// Each user has a role for role-based UI testing
// Single dummy user for development/testing only
const DUMMY_USER = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  verified: true,
};



// User type is based on the shape of the DUMMY_USER object, omitting the password for security and maintainability.
export type User = (Omit<typeof DUMMY_USER, "password"> & { [key: string]: any }) | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  // Auth mode: 'real' or 'dummy'. Allows toggling between real API and dummy/test mode.
  authMode: 'real' | 'dummy';
  setAuthMode: (mode: 'real' | 'dummy') => void;
  // Expose user role for role-based UI
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to consume the authentication context
export function useAuth() {
  // Get the context value
  const ctx = useContext(AuthContext);
  // Throw an error if used outside the AuthProvider for safety
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  // Return the context so consumers can destructure (e.g., const { logout } = useAuth())
  return ctx;
}


// AuthProvider: Provides authentication context using only dummy data. All real authentication logic is bypassed.
// Clean code, OOP, and best practices: all logic is modular, commented, and maintainable.
export function AuthProvider({ children }: { children: ReactNode }) {
  // State: current user (null if not logged in, DUMMY_USER if logged in)
  const [user, setUser] = useState<User>(null);
  // State: loading (true during hydration, false otherwise)
  const [loading, setLoading] = useState(false);
  // State: authentication mode (always 'dummy' in this version)
  const [authMode] = useState<'real' | 'dummy'>('dummy');
  // Setter for authMode (no-op, always dummy)
  const setAuthMode = () => {};
  // Router (not used, but kept for interface compatibility)
  const router = useRouter();

  // Hydrate user state on mount: always set to null (not logged in) for demo mode
  useEffect(() => {
    // No backend/API call: always start logged out
    setUser(null);
    setLoading(false);
  }, []);

  /**
   * login: Authenticates the user using only dummy credentials.
   * If the email and password match the DUMMY_USER, logs in; otherwise fails.
   * @param email - User email
   * @param password - User password
   * @param rememberMe - Ignored (for interface compatibility)
   * @returns {Promise<boolean>} - True if login succeeded, false otherwise
   */
  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<boolean> => {
    setLoading(true);
    // If credentials match dummy user, log in
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      setUser({ ...DUMMY_USER, password: undefined }); // Never expose password
      setLoading(false);
      return true;
    }
    // Otherwise, login fails
    setUser(null);
    setLoading(false);
    return false;
  };

  /**
   * logout: Logs the user out by clearing the user state.
   * @returns {Promise<void>}
   */
  const logout = async (): Promise<void> => {
    setLoading(true);
    setUser(null);
    setLoading(false);
  };

  // Provide user role for role-based UI
  const role = user && user.role ? user.role : undefined;

  // Provide the authentication context to children, always using dummy logic.
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        authMode,
        setAuthMode,
        role: user?.role ?? undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
