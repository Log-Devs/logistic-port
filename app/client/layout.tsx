"use client";

import React, { useState, useEffect } from 'react';
import ClientHeader from './components/header';  // Import the header component (fixed: directory renamed to 'components')
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageCheck,
  Clock,
  History,
  Settings,
  Headphones,
  Info,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
// Line removed as ThemeProvider is no longer used in this file.
// Interface for sidebar items
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

// Sidebar item component
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  onClick,
  collapsed = false
}) => {
  return (
    <div
      className={`sidebar-item flex items-center w-full px-4 py-3 transition-colors duration-200
        ${active ? 'bg-red-700 text-white border-l-4 border-white' : 'text-white hover:bg-red-700 hover:border-l-4 hover:border-white'}
        cursor-pointer`}
      onClick={onClick}
      style={{ minHeight: '48px' }}
    >
      <span className="flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="ml-3 transition-opacity duration-200">{text}</span>}
    </div>
  );
};

// Main layout component that integrates Sidebar and Header
// ThemeProvider removed (now only in app/layout.tsx)
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // State for responsive layout (mobile/desktop) and sidebar visibility
  // isMobileView: tracks if current viewport is mobile
  // isSidebarOpen: tracks sidebar visibility (mobile: drawer, desktop: collapse)
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile for UX

  // Navigation items
  const navItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/client/dashboard' },
    { icon: <PackageCheck size={20} />, text: 'Submit Shipment', path: '/client/submit-shipment' },
    { icon: <Clock size={20} />, text: 'Awaiting Shipments', path: '/client/awaiting-shipments' },
    { icon: <History size={20} />, text: 'Shipment History', path: '/client/shipment-history' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/client/settings' },
  ];

  // Footer items (excluding logout for custom button)
  const footerItems = [
    { icon: <Headphones size={20} />, text: 'Support', path: '/client/support' },
    { icon: <Info size={20} />, text: 'About', path: '/client/about' },
    // Logout is now a dedicated button for best UX/security
  ];

  // Listen for window resize to detect mobile view
  // Effect: Listen for window resize to update mobile/desktop state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      // On mobile, sidebar should default to closed for better UX
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Toggles sidebar visibility.
   * - On mobile: opens/closes drawer.
   * - On desktop: collapses/expands sidebar.
   */
  const toggleSidebar = () => setIsSidebarOpen((open) => !open);

  // Import the authentication context
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logout } = require("@/components/auth-context").useAuth();

  /**
   * Handles navigation item clicks.
   * For '/logout', calls the logout function and redirects to home.
   * For other paths, navigates normally.
   * Uses async/await for logout to ensure clean flow and SSR safety.
   */
  const handleItemClick = async (path: string) => {
    // Close sidebar on mobile after navigation
    if (isMobileView) setIsSidebarOpen(false);
    if (path === '/logout') {
      try {
        // Await logout for reliability and security
        await logout();
        // Redirect to home after logout
        await router.push('/');
      } catch (err) {
        // Optionally handle/log errors
        console.error('Logout failed:', err);
      }
    } else {
      router.push(path);
    }
  };

  // Helper function to determine if a menu item should be active
  const isItemActive = (itemPath: string) => {
    // For dashboard, special handling to make sure it highlights correctly
    if (itemPath === '/client/dashboard' && (pathname === '/client/dashboard' || pathname === '/client')) {
      return true;
    }

    // For other paths, check if the pathname exactly matches or starts with the path + '/'
    return pathname === itemPath || pathname.startsWith(itemPath + '/');
  };

  // Add console log for debugging path matching issues
  useEffect(() => {
    console.log('Current pathname:', pathname);
  }, [pathname]);

  return (
    <div className="flex h-screen w-full bg-slate-100 dark:bg-slate-900">
      {/* Mobile overlay: closes sidebar when clicked */}
      {isMobileView && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: responsive to mobile/desktop */}
      <div
        className={`
          ${isMobileView
            ? `fixed z-30 top-0 left-0 h-full transition-transform duration-300 ease-in-out shadow-lg ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'relative h-full transition-width duration-300 ease-in-out'
          }
          ${!isSidebarOpen && !isMobileView ? 'w-16' : 'w-64'}
        `}
      >
        <div className="sidebar flex flex-col h-full overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/sidebar-bg.jpg')` }}
          />
          {/* Red overlay */}
          <div className="absolute inset-0 z-10 bg-red-600/5" />
          {/* Sidebar content */}
          <div className="relative z-20 flex flex-col h-full">
            {/* Sidebar Header with Logo */}
            <div className={`p-4 flex ${!isSidebarOpen && !isMobileView ? 'justify-center' : 'justify-start'} items-center relative`}>
              <h1 className={`font-bold text-white ${!isSidebarOpen && !isMobileView ? 'text-xl' : 'text-2xl'} transition-all duration-300 px-1`}>
                Logistics.
              </h1>
              {/* Toggle button - only on mobile */}
              {isMobileView && (
                <button
                  onClick={toggleSidebar}
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors shadow"
                  aria-label="Toggle sidebar"
                >
                  {!isSidebarOpen ? (
                    <ChevronRight className="text-red-700 transition-transform duration-300" size={24} />
                  ) : (
                    <ChevronLeft className="text-red-700 transition-transform duration-300" size={24} />
                  )}
                </button>
              )}
            </div>
            {/* Navigation Links */}
            <div className="flex-grow p-0">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  active={isItemActive(item.path)}
                  onClick={() => handleItemClick(item.path)}
                  collapsed={!isSidebarOpen && !isMobileView}
                />
              ))}
            </div>
            {/* Footer Links */}
            <div className="flex flex-col gap-1 px-2 pb-4">
              {footerItems.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  active={isItemActive(item.path)}
                  onClick={() => handleItemClick(item.path)}
                  collapsed={!isSidebarOpen && !isMobileView}
                />
              ))}
              {/* Logout Button: Rendered exactly where the 'Exit' SidebarItem was, using SidebarItem style */}
              <SidebarItem
                icon={<LogOut size={20} />}
                text="Exit"
                active={false}
                onClick={async () => {
                  try {
                    // Call the logout function from the authentication context
                    await logout();
                    // Redirect to home after logout for security and UX
                    await router.push('/');
                  } catch (err) {
                    // Log any error that occurs during logout
                    console.error('Logout failed:', err);
                  }
                }}
                collapsed={!isSidebarOpen && !isMobileView}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Pass toggleSidebar to header for hamburger menu */}
        <ClientHeader isMobileView={isMobileView} toggleSidebar={toggleSidebar} />
        {/* Main content area grows naturally with content, no fixed or constrained height */}
        <main className="w-full overflow-y-auto bg-slate-50 dark:bg-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;