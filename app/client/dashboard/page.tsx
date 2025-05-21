"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import DashboardCard from "../components/dashboard-card"; // Fixed: directory renamed to 'components'

// Import static images from the public directory for dashboard card icons
// Place your images in /public and use the relative path (e.g., "/submit-shipment.png")
const submitShipmentIcon = "/submit-shipment.png"; // Replace with your actual image
const awaitingShipmentsIcon = "/awaiting-shipments.png"; // Replace with your actual image
const fundWalletIcon = "/fund-wallet.png"; // Replace with your actual image
const shipmentHistoryIcon = "/shipment-history.png"; // Replace with your actual image

// Dashboard card configuration array with title, icon, and action
const dashboardCards = [
  {
    title: "Submit Shipment",
    icon: submitShipmentIcon,
    href: "/client/submit-shipment",
  },
  {
    title: "Awaiting Shipments",
    icon: awaitingShipmentsIcon,
    href: "/client/awaiting-shipments",
  },
  {
    title: "Fund Wallet",
    icon: fundWalletIcon,
    href: "/client/wallet",
  },
  {
    title: "Shipment History",
    icon: shipmentHistoryIcon,
    href: "/client/shipment-history",
  },
];


/**
 * Dashboard page for Logistics app
 * - Welcome message, prompt, 2x2 grid of action cards
 * - Clean code, OOP, and best practices
 */
const ClientDashboard: React.FC = () => {
  // Get user and loading state from auth context
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Only render dashboard content if not loading and user exists
  // Global loader (AppLoaderWrapper) will handle loading state
  if (loading || !user) {
    // Render nothing while loading; global loader will show
    return null;
  }

  // Render the dashboard UI
  return (
    <div className="w-full max-h-screen px-2 md:px-12 py-8 bg-gray-100 dark:bg-slate-900 min-h-screen flex flex-col items-start">

      {/* Welcome Header */}
      {/* <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Welcome</h1> */}
      {/* Prompt */}
      <div className="mb-8 w-full">
        <div className="text-2xl font-semibold dark:text-gray-300">
          What would you like to do?
        </div>
      </div>      {/* Responsive 2x2 Grid of Dashboard Cards */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              icon={card.icon}
              onClick={() => router.push(card.href)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default ClientDashboard;