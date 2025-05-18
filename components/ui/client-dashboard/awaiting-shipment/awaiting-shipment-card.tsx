import React from "react";

interface AwaitingShipmentCardProps {
  title: string;
  description: string;
  value: number;
}

const AwaitingShipmentCard: React.FC<AwaitingShipmentCardProps> = ({ title, description, value }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border-2 hover:border-primary border-gray-300 hover:shadow-lg shadow-md duration-300 rounded-3xl px-6 py-5 flex flex-col">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-200">{title}</h1>
      <p className="text-gray-500 text-sm pt-2">{description}</p>
      <p className="text-3xl font-bold pt-5">{value}</p>
    </div>
  );
};

export default AwaitingShipmentCard;
