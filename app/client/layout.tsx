import React from "react";
import ClientHeader from "./component/header";
import ClientSidebar from "./component/sidebar";
import { ClientAuthProvider } from "./component/auth-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClientAuthProvider>
			<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
				<ClientHeader />
				<div className="flex flex-1">
					<ClientSidebar />
					<main className="flex-1 p-6 overflow-y-auto">{children}</main>
				</div>
			</div>
		</ClientAuthProvider>
	);
}