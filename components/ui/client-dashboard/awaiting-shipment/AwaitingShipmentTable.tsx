import React from 'react'
import { Clock, ArrowRight } from "lucide-react";

interface AwaitingShipment {
    id: string | number;
    recipient: string;
    startLocation: string;
    destination: string;
    arrival: string;
    items: number;
    weight: string | number;
    status: string;
}

interface AwaitingShipmentTableProps {
    awaitingShipments: AwaitingShipment[];
}

const AwaitingShipmentTable: React.FC<AwaitingShipmentTableProps> = ({ awaitingShipments }) => {
    return (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-md py-8">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                            <div className="flex items-center">
                                <Clock size={24} className="text-primary" />
                                <h1 className="text-lg sm:text-xl font-bold px-3 sm:px-5 text-gray-900 dark:text-gray-100">
                                    Awaiting Shipment List
                                </h1>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm py-2 sm:py-4 px-0 sm:px-10">
                                All shipments that are currently awaiting processing.
                            </p>
                    </div>
                    <div className="overflow-x-auto ">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-300">
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Recipient</th>
                                    <th className="px-4 py-2 text-left">Route</th>
                                    <th className="px-4 py-2 text-left">Est. Arrival</th>
                                    <th className="px-4 py-2 text-left">Items</th>
                                    <th className="px-4 py-2 text-left">Weight</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {awaitingShipments.map((shipment) => (
                                    <tr
                                        key={shipment.id}
                                        className="border-b border-gray-300 dark:border-slate-700 transition-colors hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer"
                                        style={{ height: "64px" }} // 16px top + 16px bottom padding (total 64px row height)
                                    >
                                        <td className="px-4 py-2 text-sm sm:text-base">{shipment.id}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base">{shipment.recipient}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base">
                                            {shipment.startLocation}{" "}
                                            <ArrowRight
                                                className="inline mx-1 text-gray-700 dark:text-gray-200"
                                                size={16}
                                            />{" "}
                                            {shipment.destination}
                                        </td>
                                        <td className="px-4 py-2 text-sm sm:text-base">{shipment.arrival}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base">{shipment.items}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base">{shipment.weight}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`font-semibold px-5 py-2 rounded-full text-xs sm:text-sm
                                            ${
                                                shipment.status === "Pending"
                                                    ? "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30"
                                                    : "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                                            }
                                        `}
                                            >
                                                {shipment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
    )
}

export default AwaitingShipmentTable