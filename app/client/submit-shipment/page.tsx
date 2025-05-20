import React from "react";

import StepIndicator from "../components/StepIndicator";

export default function SubmitShipmentPage() {
	return (
		<div className="min-h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
			<h1 className="text-2xl font-bold mb-2">Submit a New Shipment</h1>
			<p className="mb-6 text-gray-400">Fill out the form below to create a new shipment request.</p>
			{/* TODO: Add shipment form here */}

			<StepIndicator step={2} />
			{/* Placeholder for the shipment form */}
			<div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
				<p>Shipment form coming soon.</p>
			</div>
		</div>
	);
}