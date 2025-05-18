import React from "react";

export default function ClientDashboard() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
			<p className="mb-6">
				Here you can track your shipments, submit new ones, and manage your
				account.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
					<h2 className="font-semibold mb-2">Quick Actions</h2>
					<ul className="list-disc list-inside">
						<li>Submit a new shipment</li>
						<li>View awaiting shipments</li>
						<li>Check shipment history</li>
						<li>Update your settings</li>
					</ul>
				</div>
				<div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
					<h2 className="font-semibold mb-2">Recent Activity</h2>
					<p>No recent activity yet.</p>
				</div>
			</div>
		</div>
	);
}