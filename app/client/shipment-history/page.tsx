import React from "react";

export default function ShipmentHistoryPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Shipment History</h1>
			<p className="mb-6">Review your past shipments and their statuses.</p>
			{/* TODO: List shipment history here */}
			<div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
				<p>No shipment history available yet.</p>
			</div>
		</div>
	);
}