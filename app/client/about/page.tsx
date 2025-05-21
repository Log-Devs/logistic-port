// Client-specific About page for the logistics portfolio app
// Implements clean code, OOP, and UX best practices
// Fully commented and inherits the client app layout (with sidebar)

import React from 'react';

/**
 * ClientAboutPage
 * Professional About page for the client section of the logistics portfolio app.
 * Explains the mission, features, and vision of the platform for authenticated users.
 * Follows clean code architecture and OOP principles.
 */
const ClientAboutPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-white dark:bg-slate-900">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-blue-900 dark:text-blue-200">About This App (Client)</h1>
      {/* Description Section */}
      <section className="max-w-2xl text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
        <p>
          Welcome to the client portal of our logistics platform! Here, you can manage your shipments, track progress, and access advanced features tailored for our valued clients.
        </p>
        <p className="mt-4">
          This client section is designed for efficiency, security, and a seamless user experience. All features are accessible from the sidebar for easy navigation.
        </p>
        <p className="mt-4">
          For help or feedback, please use the Support link in the sidebar.
        </p>
      </section>
      {/* Features List */}
      <section className="max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-100">Client Portal Features</h2>
        <ul className="list-disc list-inside text-left text-gray-800 dark:text-gray-200 space-y-2">
          <li>Personalized shipment dashboard</li>
          <li>Advanced tracking and notifications</li>
          <li>Secure user profile and settings</li>
          <li>Access to dedicated client support</li>
          <li>Professional, responsive UI with sidebar navigation</li>
        </ul>
      </section>
    </main>
  );
};

export default ClientAboutPage;
