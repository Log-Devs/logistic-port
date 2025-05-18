// Next.js DashboardCard component using next/image for optimized images
// Follows clean code architecture, OOP principles, and is fully documented

import Image from 'next/image'; // Next.js optimized image component
import React from 'react'; // React for functional components and typing

// Interface for DashboardCard props, ensuring type safety and clarity
export interface DashboardCardProps {
  /**
   * The title to display on the card
   */
  title: string;
  /**
   * The path or URL to the icon image (should be a static asset or optimized URL)
   */
  icon: string;
  /**
   * Optional click handler for the card (e.g., navigation or modal open)
   */
  onClick?: () => void;
}

/**
 * DashboardCard component for displaying an icon and a title in a styled card.
 * Uses next/image for optimized image loading and accessibility best practices.
 *
 * @param {DashboardCardProps} props - The properties for the DashboardCard
 * @returns {JSX.Element} The rendered dashboard card
 */
const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, onClick }) => {
  return (
    // Main card container with click handler
    <div
      className={[
  // Border, rounded corners, padding, flex column, centered content
  'border rounded-lg p-6 flex flex-col items-center justify-center',
  // Transition for all properties, shadow on hover, pointer cursor
  'transition-all hover:shadow-lg cursor-pointer',
  // Border and background for light and dark mode
  'bg-white  dark:bg-slate-900 border-gray-200 dark:border-gray-700',
  // Custom hover border color for light and dark mode
  'hover:border-[#e60000] dark:hover:border-[#ff3333]',
  // Fixed height and full width
  'h-[250px] w-full',
  // Prevent text selection for UX
  'select-none'
].join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined} // Accessibility: role button if clickable
      tabIndex={onClick ? 0 : undefined} // Accessibility: focusable if clickable
      aria-label={title} // Accessibility: label for screen readers
    >
      {/* Icon container, centers the icon vertically and horizontally */}
      <div className=" mb-4 flex items-center justify-center h-20">
        {/*
          Use next/image for optimized image loading. For static assets, place them in the public/ directory and pass the relative path.
          Example: icon="/icons/dashboard.svg"
        */}
        <Image
          src={icon}
          alt={title}
          width={64} // 4rem (h-16/w-16)
          height={64}
          className="h-16 w-16 object-contain"
          priority // Loads the image with high priority
        />
      </div>
      {/* Title text, centered and styled */}
      <div className="text-center font-medium text-lg truncate">{title}</div>
    </div>
  );
};

export default DashboardCard;
