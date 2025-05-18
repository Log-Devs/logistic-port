"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { FaBoxOpen, FaClock, FaWallet, FaHistory } from "react-icons/fa";
import Link from "next/link";

// Card data for dashboard actions
const dashboardCards = [
  {
    label: "Submit Shipment",
    href: "/submit-shipment",
    icon: <FaBoxOpen size={48} className="text-orange-500" />,
  },
  {
    label: "Awaiting Shipments",
    href: "/awaiting-shipments",
    icon: <FaClock size={48} className="text-green-600" />,
  },
  {
    label: "Fund Wallet",
    href: "/wallet",
    icon: <FaWallet size={48} className="text-yellow-500" />,
  },
  {
    label: "Shipment History",
    href: "/shipment-history",
    icon: <FaHistory size={48} className="text-pink-500" />,
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

  if (loading || !user) {
    return <div className="text-center py-20 text-lg">Loading your dashboard...</div>;
  }

  return (
    <div className="w-full h-full px-2 md:px-12 py-8">
      {/* Welcome Header */}
      <h1 className="text-3xl font-bold mb-2">Welcome</h1>
      {/* Prompt */}
      <div className="text-lg font-semibold mb-8">What would you like to do?</div>
      {/* 2x2 Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        {dashboardCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow p-8 gap-4 min-h-[180px] group"
          >
            <div>{card.icon}</div>
            <div className="text-base font-semibold text-slate-700 group-hover:text-red-600 transition-colors">
              {card.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;