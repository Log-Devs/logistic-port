"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { UserCircle, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface ClientHeaderProps {
  isMobileView?: boolean;
  toggleSidebar?: () => void;
}

/**
 * Header component for the Logistics app
 * - Left: Mobile menu button (on small screens) and Welcome title
 * - Right: Username and email with user icon
 * - Fully responsive with proper spacing on all device sizes
 */
const ClientHeader: React.FC<ClientHeaderProps> = ({
  isMobileView = false,
  toggleSidebar = () => { }
}) => {
  // Get user from authentication context
  const { user } = useAuth();

  return (
    <header
      className="w-full h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white dark:bg-slate-800 border-b border-slate-600 dark:border-slate-700"
      style={{ minWidth: 0 }}
    >
      {/* Left Section: Title with optional menu button */}
      <div className="flex items-center gap-2">
        {/* Mobile menu button - only shown when header is specifically told it's mobile view */}
        {isMobileView && (
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} className="text-slate-700" />
          </button>
        )}

        {/* Title that adapts text size based on screen width */}
        {/*a welcome message that will be displayed when the user is logged in Hi {user?.name} it should just show the surname name not the entire name */}
        <div className="font-bold text-xl sm:text-2xl text-[color:#1A2B6D] truncate dark:text-white">
          {/*add the comment on how it can display the firstname just change the 1 to 0*/}
          Hi, {user?.name ? (user.name.split(" ").length > 1 ? user.name.split(" ")[1] : user.name) : "Guest"}
        </div>
      </div>

      {/* User Info - Simplified on very small screens */}
      {/* Account details section: username/email stacked, themed, icon at far right, theme toggle */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-[170px] justify-end">
        {/* User info stacked, always visible, themed color, right-aligned */}
        <div className="flex flex-col items-end text-right mr-2">
          <span className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
            {user?.name || "UserName"}
          </span>
          <span className="text-xs text-[color:#1A2B6D] dark:text-slate-300 leading-tight">
            {user?.email || "emailgoeshere"}
          </span>
        </div>
        {/* User icon, themed border for clarity it should use the persons profile by default and let the styling be professional  */}
        <div className="flex items-center justify-center border-slate-800 dark:border-white p-0.5">
          <img
            src={user?.image || "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Background.png"}
            alt="User Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
        {/* Theme toggle button - animated, consistent with navbar */}
        <ThemeToggle />
      </div>
    </header>
  );
};

/**
 * Animated theme toggle button (uses Navbar logic)
 * - Uses next-themes for theme switching
 * - Animated with framer-motion, Sun/Moon icons
 * - Consistent with navbar toggle
 */
const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      aria-label="Toggle theme"
      className="p-2 hover:bg-muted rounded-full transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ClientHeader;