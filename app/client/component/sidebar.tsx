"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
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
  Menu
} from 'lucide-react';

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
    // Sidebar item with full-width hover and left white border on hover/active
    <div
      className={`sidebar-item flex items-center w-full px-4 py-3 transition-colors duration-200
        ${active ? 'bg-red-700 text-white border-l-4 border-white' : 'text-white hover:bg-red-700 hover:border-l-4 hover:border-white'}
        cursor-pointer`}
      onClick={onClick}
      style={{ minHeight: '48px' }} // Ensures consistent clickable area
    >
      <span className="flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="ml-3 transition-opacity duration-200">{text}</span>}
    </div>
  );
};

// Main sidebar component
const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // State for mobile sidebar visibility and desktop collapsed state
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  // Listen for window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      // Auto-collapse sidebar on mobile, expand on desktop
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items with paths and updated icons
  const navItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/dashboard' },
    { icon: <PackageCheck size={20} />, text: 'Submit Shipment', path: '/submit-shipment' },
    { icon: <Clock size={20} />, text: 'Awaiting Shipments', path: '/awaiting-shipments' },
    { icon: <History size={20} />, text: 'Shipment History', path: '/shipment-history' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings' },
  ];

  // Footer items with paths
  const footerItems = [
    { icon: <Headphones size={20} />, text: 'Support', path: '/support' },
    { icon: <Info size={20} />, text: 'About', path: '/about' },
    { icon: <LogOut size={20} />, text: 'Exit', path: '/logout' },
  ];

  // Handle item click for navigation
  const handleItemClick = (path: string) => {
    // On mobile, close the sidebar after navigation
    if (isMobileView) setIsOpen(false);

    // Navigate to the selected path
    if (path === '/logout') {
      // Handle logout action here
      console.log('Logout clicked');
    } else {
      router.push(path);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Visible only on mobile */}
      {isMobileView && !isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}
      
      {/* Mobile overlay - only appears when sidebar is open on mobile */}
      {isMobileView && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar component with responsive behavior */}
      <div 
        className={`
          ${isMobileView 
            ? `fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'relative h-full transition-width duration-300 ease-in-out'
          }
          ${!isOpen && !isMobileView ? 'w-16' : 'w-64'}
        `}
      >
        {/* Sidebar container */}
        <div className="sidebar flex flex-col h-full overflow-hidden">
          {/* Background image absolutely positioned */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/sidebar-bg.jpg')`,
            }}
          />
          {/* Red overlay with lower opacity and darker shade for better image visibility */}
          <div className="absolute inset-0 z-10 bg-red-600/5" />

          {/* Sidebar content (logo, nav, footer) above overlays */}
          <div className="relative z-20 flex flex-col h-full">
            {/* Sidebar Header with Logo */}
            <div className={`p-4 flex ${!isOpen && !isMobileView ? 'justify-center' : 'justify-start'} items-center relative`}>
              <h1 className={`font-bold text-white ${!isOpen && !isMobileView ? 'text-xl' : 'text-2xl'} transition-all duration-300 px-1`}>
                Logistics.
              </h1>
              
              {/* Toggle button - positioned differently for mobile vs desktop */}
              <button
                onClick={toggleSidebar}
                className={`
                  ${isMobileView 
                    ? 'absolute top-1/2 right-2 -translate-y-1/2' 
                    : 'absolute top-1/2 right-0 -translate-y-1/2 transform translate-x-1/2'
                  }
                  p-1 rounded-full bg-white/80 hover:bg-white transition-colors shadow
                `}
                aria-label="Toggle sidebar"
              >
                {!isOpen ? (
                  <ChevronRight className="text-red-700 transition-transform duration-300" size={24} />
                ) : (
                  <ChevronLeft className="text-red-700 transition-transform duration-300" size={24} />
                )}
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-grow p-0">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  active={pathname === item.path}
                  onClick={() => handleItemClick(item.path)}
                  collapsed={!isOpen && !isMobileView}
                />
              ))}
            </div>
            
            {/* Footer Links */}
            <div className="mt-auto p-0">
              {footerItems.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  onClick={() => handleItemClick(item.path)}
                  collapsed={!isOpen && !isMobileView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;