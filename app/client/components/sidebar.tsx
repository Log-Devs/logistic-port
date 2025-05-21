// Import the custom hook to detect mobile view
// Import custom hook to detect mobile view
import { useIsMobile } from "@/hooks/use-mobile";
// Import authentication context for logout functionality
import { useAuth } from "@/components/auth-context";
// Import toast for user feedback notifications
import { toast } from "@/components/ui/use-toast";
// Import React and useState for component and state management
import React, { useState } from "react";
// Import Next.js router for navigation
import { useRouter } from "next/navigation";

/**
 * Sidebar component for navigation and logout functionality.
 * Handles sidebar open/close state for mobile UX.
 * Provides professional logout logic with user feedback.
 * Follows clean code architecture and OOP principles.
 */

const Sidebar: React.FC = () => {
  // State to track if the sidebar is open (for mobile/drawer UX)
  const [isOpen, setIsOpen] = useState(false);
  // State to track if logout is in progress for professional UX
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // Detect if the current viewport is mobile
  const isMobileView = useIsMobile();
  // Access logout method from authentication context
  const { logout } = useAuth();
  const router = useRouter();

  /**
   * Handles navigation item clicks, including logout logic.
   * @param path - The navigation path or '/logout' for logout action
   */
  const handleItemClick = async (path: string) => {
    // On mobile, close the sidebar after navigation for better UX
    if (isMobileView) setIsOpen(false);
    // If the user clicks the 'Logout' or logout item, perform a secure logout
    if (path === '/logout') {
      try {
        // Set logout loading state for UX feedback
        setIsLoggingOut(true);
        // Call the logout function from the authentication context
        await logout();
        // Show a success toast notification
        toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
        // Redirect the user to the login screen after logout for security and UX
        router.push('/login');
      } catch (error) {
        // Show an error toast notification if logout fails
        toast({ title: 'Logout failed', description: 'An error occurred during logout. Please try again.', variant: 'destructive' });
      } finally {
        // Always clear loading state
        setIsLoggingOut(false);
      }
    } else {
      // For other navigation, simply route to the selected path
      router.push(path);
    }
  };

  // Clean sidebar UI skeleton with comments and ready for OOP/feature expansion
  return (
    <aside className="sidebar relative">
      {/* Professional loading overlay shown during logout */}
      {isLoggingOut && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60"
          aria-live="polite"
          aria-busy="true"
        >
          {/* Accessible spinner animation */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-80 mb-4" />
          <span className="text-white text-lg font-semibold">Logging out...</span>
        </div>
      )}
      {/* Sidebar toggle button for mobile UX */}
      <button onClick={() => setIsOpen((open) => !open)} className="sidebar-toggle" disabled={isLoggingOut}>
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      {/* Sidebar navigation, only visible when sidebar is open */}
      {isOpen && (
        <nav className="sidebar-nav">
          <ul className={isLoggingOut ? 'pointer-events-none opacity-60' : ''}>
            {/* Navigation item: Support page */}
            <li>
              {/* Button navigates to the Support page using handleItemClick */}
              <button onClick={() => handleItemClick('/client/support')} className="sidebar-nav-item" disabled={isLoggingOut}>
                Support
              </button>
            </li>
            {/* Navigation item: About page */}
            <li>
              {/* Button navigates to the About page using handleItemClick */}
              <button onClick={() => handleItemClick('/c-about')} className="sidebar-nav-item" disabled={isLoggingOut}>
                About
              </button>
            </li>
            {/* Example logout nav item */}
            <li>
              {/* Button logs out the user using handleItemClick */}
              <button onClick={() => handleItemClick('/logout')} className="sidebar-nav-item" disabled={isLoggingOut}>
                Logout
              </button>
            </li>
            {/* Additional navigation items can be added here following the same pattern */}
          </ul>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;