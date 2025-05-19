"use client";

import React, { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import AwaitingShipmentCard from "@/app/client/components/AwaitingShipmentCard";
import { AwaitingShipmentTable, useAwaitingShipments } from "@/app/client/components/AwaitingShipmentTable";
// Use Next.js alias if available, otherwise fallback to relative path
import { SHIPMENT_STATUSES } from '@/lib/logistics-statuses';

export default function AwaitingShipmentsPage() {
  // Fetch shipments using the production-ready hook
  // In DEV_MODE, this will return dummy data. In production, it uses your real API.
  // All edge cases (loading, error, empty, large data) are handled by the AwaitingShipmentTable.
  const [shipments, loading, error] = useAwaitingShipments("/api/awaiting-shipments");

  return (
    <div className="min-h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="flex items-center mb-6">
        <Clock size={32} className="text-primary" />
        <h1 className="text-2xl font-bold px-5 text-gray-900 dark:text-gray-100">
          Awaiting Shipments
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/*
          Compute card stats from the actual shipments array (API or dummy data).
          This ensures the dashboard always reflects real data, regardless of environment.
          Clean code, OOP, and maintainable best practices.
        */}
        {(() => {
          // Count shipments by status
          const pending = shipments.filter(s => s.status === "Pending").length;
          const received = shipments.filter(s => s.status === "Received").length;
          const total = shipments.length;
          // Card definitions
// Status color map for professional UX
const statusCardColorMap: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-400",
  RECEIVED_AT_ORIGIN: "bg-blue-100 text-blue-800 border-blue-400",
  READY_FOR_TRANSPORT: "bg-blue-100 text-blue-800 border-blue-400",
  IN_TRANSIT: "bg-red-100 text-red-800 border-red-400",
  RECEIVED_AT_DESTINATION: "bg-blue-100 text-blue-800 border-blue-400",
  READY_FOR_PICKUP: "bg-blue-100 text-blue-800 border-blue-400",
  OUT_FOR_DELIVERY: "bg-blue-100 text-blue-800 border-blue-400",
  DELIVERED: "bg-green-100 text-green-800 border-green-400",
};

// Dynamically render a card for each status in SHIPMENT_STATUSES
// Only show Total Awaiting, Pending, and Received cards
const pendingStatus = SHIPMENT_STATUSES.find(s => s.code === 'PENDING');
const receivedStatus = SHIPMENT_STATUSES.find(s => s.code === 'RECEIVED_AT_ORIGIN');
// Only show Total Awaiting, Pending, and Received cards (all props always defined)
const cards = [
  {
    title: "Total Awaiting",
    description: "All processing payments",
    value: total,
    // Use green color scheme for Total Awaiting as requested
    color: "bg-green-100 text-green-800 border-green-400",
  },
  ...(pendingStatus ? [{
    title: pendingStatus.label || "Pending",
    description: pendingStatus.description || "Shipments yet to be processed",
    value: shipments.filter(s => s.status === pendingStatus.code).length,
    color: statusCardColorMap[pendingStatus.code] || "bg-yellow-100 text-yellow-800 border-yellow-400",
  }] : []),
  ...(receivedStatus ? [{
    title: receivedStatus.label || "Received",
    description: receivedStatus.description || "Ready to be transported",
    value: shipments.filter(s => s.status === receivedStatus.code).length,
    color: statusCardColorMap[receivedStatus.code] || "bg-blue-100 text-blue-800 border-blue-400",
  }] : []),
];
// Render cards, all props are defined and type-safe
return cards.map((card) => (
  <AwaitingShipmentCard key={card.title} {...card} />
));
          return cards.map(card => (
            <AwaitingShipmentCard key={card.title} {...card} />
          ));
        })()}
      </div>

      {/* Awaiting Shipments List/Table */}
      <div>
        {/*
          AwaitingShipmentTable is now fully API-integrated and robust.
          - In DEV_MODE (see .env.example), it will show dummy data for development.
          - In production, set REAL_AWAITING_SHIPMENTS_API_URL to your real API endpoint.
          - All edge cases (loading, error, empty, large data) are handled automatically.
          - See README for usage and configuration details.
        */}
        {/* Render the AwaitingShipmentTable with fetched shipments, loading, and error states */}
        <AwaitingShipmentTable awaitingShipments={shipments} loading={loading} error={error} />
      </div>
    </div>
  );
}
