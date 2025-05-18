import React from "react";
import Link from "next/link";

const navItems = [
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Submit Shipment", href: "/submit-shipment" },
	{ label: "Awaiting Shipments", href: "/awaiting-shipments" },
	{ label: "Shipment History", href: "/shipment-history" },
	{ label: "Settings", href: "/settings" },
];

export default function ClientSidebar() {
	return (
		<aside className="h-full w-56 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col py-6 px-3">
			<nav className="flex flex-col gap-2">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="px-3 py-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium"
					>
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	);
}