import React from "react";

export default function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-gray-500">Manage your account details and preferences</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="font-semibold">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="font-semibold">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="font-semibold">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
