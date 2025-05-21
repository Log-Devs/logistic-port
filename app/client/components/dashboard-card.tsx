import Image from 'next/image';
import React from 'react';
import { Box, Clock, History, MapPin } from 'lucide-react'; // Import icons that match the design

// Type for the icon component name
type IconComponentName = "box" | "clock-delivery" | "history" | "location";

// Interface for DashboardCard props
export interface DashboardCardProps {
  title: string;
  description: string;
  imageSrc: string;
  iconComponent: IconComponentName;
  onClick?: () => void;
}

/**
 * DashboardCard component that exactly matches the design in the image
 */
const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  iconComponent, 
  onClick 
}) => {
  // Function to render the appropriate icon based on the iconComponent prop
  const renderIcon = () => {
    switch (iconComponent) {
      case "box":
        return <Box className="h-8 w-8 text-white" />;
      case "clock-delivery":
        return <Clock className="h-8 w-8 text-white" />;
      case "history":
        return <History className="h-8 w-8 text-white" />;
      case "location":
        return <MapPin className="h-8 w-8 text-white" />;
      default:
        return <Box className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer w-full hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {/* Image Background - full size to match the image design */}
      <div className="w-full h-44 relative">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      
      {/* Circular icon on the right side - exactly as in the image */}
      <div className="absolute bottom-4 right-4 bg-blue-800 rounded-full p-3 flex items-center justify-center">
        {renderIcon()}
      </div>
    </div>
  );
};

export default DashboardCard;