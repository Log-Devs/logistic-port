import React from "react";

// Extended to accept a color prop for status-based color coding
interface AwaitingShipmentCardProps {
  title: string;
  description: string;
  value: number;
  color?: string; // Tailwind color classes for card background/border/text
}

const AwaitingShipmentCard: React.FC<AwaitingShipmentCardProps> = ({ title, description, value, color }) => {
  // Use provided color classes or fallback to a neutral professional default
  const colorClasses = color || "bg-white dark:bg-slate-800 border-gray-300 text-gray-900";
  return (
    <div className={`border hover:border-primary hover:shadow-lg shadow-md duration-300 rounded-3xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col w-full max-w-xs sm:max-w-none mx-auto ${colorClasses}`}>
      <h1
      className="text-lg sm:text-xl font-semibold text-[color:var(--tetiary)] "
      >
        {title}
      </h1>
      <p className="text-sm pt-1 sm:pt-2">{description}</p>
      <p className="text-2xl sm:text-3xl font-bold pt-4 sm:pt-5">{value}</p>
    </div>
  );
};

export default AwaitingShipmentCard;
