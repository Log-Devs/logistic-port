"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdNotificationsNone } from "react-icons/md";
import { FaGlobeAsia } from "react-icons/fa";
import { MdOutlineLockPerson } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import AccountSettings from "../components/settings/AccountSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import SecuritySettings from "../components/settings/SecuritySettings";

export default function ClientSettingsPage() {
	const [activeTab, setActiveTab] = useState<'account' | 'notification' | 'preferences' | 'security'>('account');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const menuItems = [
		{ id: 'account', icon: FaUser, label: 'Account' },
		{ id: 'notification', icon: MdNotificationsNone, label: 'Notification' },
		{ id: 'preferences', icon: FaGlobeAsia, label: 'Preferences' },
		{ id: 'security', icon: MdOutlineLockPerson, label: 'Security' },
	];

	const handleTabChange = (tabId: typeof activeTab) => {
		setActiveTab(tabId);
		setIsDropdownOpen(false);
	};

	const renderContent = () => {
		switch (activeTab) {
			case 'account':
				return <AccountSettings />;
			case 'notification':
				return <NotificationSettings />;
			case 'preferences':
				return <PreferencesSettings />;
			case 'security':
				return <SecuritySettings />;
			default:
				return <AccountSettings />;
		}
	};

	const activeMenuItem = menuItems.find(item => item.id === activeTab);

	return (
		<div className="min-h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
			<h1 className="text-2xl font-bold mb-2">Settings</h1>
			<p className="mb-6 text-gray-400">Set up your preferences</p>
					<div className="flex flex-col md:flex-row gap-6 md:gap-10">
				{/* Mobile Dropdown */}
				<div className="md:hidden relative">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="w-full p-4 bg-white dark:bg-slate-800 rounded-2xl shadow flex items-center justify-between"
					>
						<div className="flex items-center gap-3">
							{activeMenuItem && <activeMenuItem.icon className="text-2xl" />}
							<span>{activeMenuItem ? activeMenuItem.label : ''}</span>
						</div>
						<MdKeyboardArrowDown className={`text-2xl transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
					</button>
					
					<ul 
						className={`absolute z-10 w-full mt-2 py-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg transition-all duration-300 origin-top
							${isDropdownOpen 
								? 'opacity-100 scale-100 translate-y-0' 
								: 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
					>
						{menuItems.map((item) => (
							<li 
								key={item.id}
								onClick={() => handleTabChange(item.id as typeof activeTab)}
								className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition-all duration-300 
									${activeTab === item.id ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
							>
								<item.icon className="text-2xl mr-3" /> {item.label}
							</li>
						))}
					</ul>
				</div>

				{/* Desktop Sidebar */}
				<div className="hidden md:block p-4 py-6 bg-white dark:bg-slate-800 rounded-2xl shadow min-w-[200px]">
					<ul>
						{menuItems.map((item) => (
							<li 
								key={item.id}
								onClick={() => handleTabChange(item.id as typeof activeTab)}
								className={`flex items-center gap-2 py-3 pl-3 my-4 rounded-lg cursor-pointer transition-all duration-300 
									${activeTab === item.id ? 'bg-gray-300 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
							>
								<item.icon className="text-2xl mr-3" /> {item.label}
							</li>
						))}
					</ul>
				</div>

				{/* Content Area */}
				<div className="p-4 py-6 bg-white dark:bg-slate-800 rounded-2xl shadow flex-1">
					{renderContent()}
				</div>
			</div>
		</div>
	);
}