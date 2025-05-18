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

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // State to track the current user
  const [user, setUser] = useState<User>(null);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to control authentication mode: 'real' or 'dummy' (for testing)
  // Persist authMode in localStorage for consistency across reloads and remounts
  const [authMode, setAuthModeState] = useState<'real' | 'dummy'>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('auth_mode');
      if (stored === 'dummy' || stored === 'real') return stored;
    }
    return 'real';
  });

  // Custom setter to update both state and localStorage
  const setAuthMode = (mode: 'real' | 'dummy') => {
    setAuthModeState(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('auth_mode', mode);
    }
  };

  const router = useRouter();

  // Configurable dummy session expiration in minutes (default: 120 min = 2 hours)
  const DUMMY_SESSION_MINUTES = 120;

  // Hydrate user from /api/auth/me or dummy user based on authMode
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        if (authMode === 'dummy') {
          // In dummy mode, check for the dummy_auth cookie (JSON: { user, expires })
          const dummyAuthRaw = Cookies.get('dummy_auth');
          if (dummyAuthRaw) {
            try {
              const dummySession = JSON.parse(dummyAuthRaw);
              // Check expiration
              if (dummySession.expires && Date.now() < dummySession.expires) {
                setUser(dummySession.user);
              } else {
                // Expired: clear session
                setUser(null);
                Cookies.remove('dummy_auth');
              }
            } catch {
              setUser(null);
              Cookies.remove('dummy_auth');
            }
          } else {
            setUser(null);
          }
        } else {
          // Only hydrate from real API
          const data = await fetchWithFallback<{ user: User }>(
            "/api/auth/me",
            { credentials: "include" }
          );
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
    // Re-run hydration when authMode changes
  }, [authMode]);

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
  // Login function supports both real and dummy auth modes
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    setLoading(true);
    try {
      if (authMode === 'dummy') {
        // Dummy mode: Only allow login if credentials match the single dummy user
        if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
          // Exclude password from user object for state/cookie
          const { password, ...userNoPass } = DUMMY_USER;
          setUser(userNoPass);
          // Set a cookie with user info and expiration timestamp
          const expires = Date.now() + DUMMY_SESSION_MINUTES * 60 * 1000;
          Cookies.set('dummy_auth', JSON.stringify({ user: userNoPass, expires }), { expires: 7 });
          setLoading(false);
          return true;
        } else {
          setUser(null);
          Cookies.remove('dummy_auth');
          setLoading(false);
          return false;
        }
      } else {
        // Real mode: Attempt real API login
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
      }
    } catch (err) {
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
  // Logout function supports both real and dummy auth modes
  const logout = async () => {
    setLoading(true);
    try {
      if (authMode === 'dummy') {
        // Dummy mode: just clear user and remove dummy_auth cookie
        setUser(null);
        Cookies.remove('dummy_auth');
      } else {
        // Real mode: Use fetchWithFallback for logout API call
        await fetchWithFallback(
          "/api/auth/logout",
          { method: "POST", credentials: "include" },
          {} // fallback: no-op for logout
        );
        setUser(null);
      }
    } finally {
      setLoading(false);
      router.push("/");
    }
  };



  // Provide user role for role-based UI
  const role = user && user.role ? user.role : undefined;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, authMode, setAuthMode, role }}>

      {children}
    </AuthContext.Provider>
  );
}

