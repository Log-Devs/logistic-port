import React from "react";
import { LayoutDashboard, PackageCheck, Clock, History, Settings, Headphones, Info, LogOut, ChevronLeft, ChevronRight, Menu, Sun, Moon, Globe, Ship, Truck, Award, Shield } from 'lucide-react';
import AwaitingShipmentCard from "@/components/ui/client-dashboard/awaiting-shipment/awaiting-shipment-card";

export default function AwaitingShipmentsPage() {
	return (
		<div className="h-screen px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
			<div className="flex items-center mb-6">
				<Clock size={32} className="text-primary" />
				<h1 className="text-2xl font-bold px-5 text-gray-900 dark:text-gray-100">Awaiting Shipments</h1>
			</div>

			{/* Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
				{[
					{
						title: "Total Awaiting",
						description: "All processing payments",
						value: 5,
					},
					{
						title: "Pending",
						description: "Shipments yet to be processed",
						value: 3,
					},
					{
						title: "Received",
						description: "Ready to be transported",
						value: 2,
					},
				].map((card) => (
					<AwaitingShipmentCard key={card.title} {...card} />
				))}
			</div>
			
		</div>
	);
}