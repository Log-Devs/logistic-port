"use client";

import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

export default function SecuritySettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex text-xl font-semibold mb-2">
        <FaShieldAlt className="text-2xl mr-3" />
        <h2>Security Settings</h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Manage your account security</p>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="current-password" className="block text-md font-semibold mb-2">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:border-slate-600"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label htmlFor="new-password" className="block text-md font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:border-slate-600"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-md font-semibold mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-700 dark:border-slate-600"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary border-2 border-primary hover:border-2 transition-colors mt-2"
        >
          Update Password
        </button>

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold">Two-Factor Authentication</h3>
              <p className="text-gray-400">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary border-2 border-primary hover:border-2 transition-colors"
        >
          Update Security Settings
        </button>
      </form>
    </div>
  );
}
