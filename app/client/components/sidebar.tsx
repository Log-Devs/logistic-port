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
import styles from './sidebar.module.css';

const Sidebar: React.FC = () => {
  // State to track if the sidebar is open (for mobile/drawer UX)
  const [isOpen, setIsOpen] = useState(false);
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
    // If the user clicks the 'Exit' or logout item, perform a secure logout
    if (path === '/logout') {
      try {
        // Call the logout function from the authentication context
        await logout();
        // Show a success toast notification
        toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
        // Redirect the user to the login screen after logout for security and UX
        router.push('/login');
      } catch (error) {
        // Show an error toast notification if logout fails
        toast({ title: 'Logout failed', description: 'An error occurred during logout. Please try again.', variant: 'destructive' });
      }
    } else {
      // For other navigation, simply route to the selected path
      router.push(path);
    }
  };

  // Clean sidebar UI skeleton with comments and ready for OOP/feature expansion
  return (
    <aside className="sidebar">
      {/* Sidebar toggle button for mobile UX */}
      <button onClick={() => setIsOpen((open) => !open)} className="sidebar-toggle">
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      {/* Sidebar navigation, only visible when sidebar is open */}
      {isOpen && (
        <nav className="sidebar-nav">
          <ul>
            {/* Navigation item: Support page */}
            <li>
              {/* Button navigates to the Support page using handleItemClick */}
              <button onClick={() => handleItemClick('/client/support')} className={styles['sidebar-nav-item']}>
                Support
              </button>
            </li>
            {/* Navigation item: About page */}
            <li>
              {/* Button navigates to the About page using handleItemClick */}
              <button onClick={() => handleItemClick('/c-about')} className={styles['sidebar-nav-item']}>
                About
              </button>
            </li>
            {/* Example logout nav item */}
            <li>
              {/* Button logs out the user using handleItemClick */}
              <button onClick={() => handleItemClick('/logout')} className={styles['sidebar-nav-item']}>
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