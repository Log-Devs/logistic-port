"use client";

import React from 'react';
import { FaBell } from 'react-icons/fa';

export default function NotificationSettings() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex text-xl font-semibold mb-2">
        <FaBell className="text-2xl mr-3" />
        <h2>Notification Settings</h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Control how you receive notifications</p>
      
      <form className="space-y-6">
        <div>
          <div className="border-b border-b-gray-300 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold">Shipment Updates</h3>
              <p className="text-gray-400">Receive updates when your shipment status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="border-b border-b-gray-300 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold">Delivery Alerts</h3>
              <p className="text-gray-400">Get notifications once your package is delivered</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="border-b border-b-gray-300 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold">Delay Notifications</h3>
              <p className="text-gray-400">Be alerted if there is a delay with your shipment</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="border-b border-b-gray-300 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold">Marketing & Notifications</h3>
              <p className="text-gray-400">Updates on latest deals and info</p>
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
          Save Preferences
        </button>
      </form>
    </div>
  );
}
