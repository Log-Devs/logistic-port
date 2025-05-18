import React from "react";

interface AwaitingShipmentCardProps {
  title: string;
  description: string;
  value: number;
}

const AwaitingShipmentCard: React.FC<AwaitingShipmentCardProps> = ({ title, description, value }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border hover:border-primary border-gray-300 hover:shadow-lg shadow-md duration-300 rounded-3xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col w-full max-w-xs sm:max-w-none mx-auto">
      <h1
      className="text-lg sm:text-xl font-semibold text-[color:var(--tetiary)] dark:text-[#AEB8D0]"
      >
      {title}
      </h1>
      <p className=" text-sm pt-1 sm:pt-2">{description}</p>
      <p className="text-2xl sm:text-3xl font-bold pt-4 sm:pt-5">{value}</p>
    </div>
  );
};

export default AwaitingShipmentCard;
