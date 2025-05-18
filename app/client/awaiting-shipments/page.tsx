import React from "react";

export default function AwaitingShipmentsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Awaiting Shipments</h1>
			<p className="mb-6">View all shipments that are currently being processed or are in transit.</p>
			{/* TODO: List awaiting shipments here */}
			<div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
				<p>No awaiting shipments at the moment.</p>
			</div>
		</div>
	);
}