"use client";

import React, { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import AwaitingShipmentCard from "@/app/client/components/AwaitingShipmentCard";
import AwaitingShipmentTable, { AwaitingShipment, useAwaitingShipments } from "@/app/client/components/AwaitingShipmentTable";
// Use Next.js alias if available, otherwise fallback to relative path
import { SHIPMENT_STATUSES, ShipmentStatus } from '@/lib/logistics-statuses'; // Import ShipmentStatus type for type safety
import { STATUS_COLOR_MAP } from '@/lib/status-color-map';

export default function AwaitingShipmentsPage() {
  // Fetch shipments using the production-ready hook
  // In DEV_MODE, this will return dummy data. In production, it uses your real API.
  // All edge cases (loading, error, empty, large data) are handled by the AwaitingShipmentTable.
  const [shipments, loading, error] = useAwaitingShipments("/api/awaiting-shipments");

  // Compute dashboard cards before JSX for type safety and to avoid JSX IIFE errors
  // Explicitly type the result of .find() for robust type inference
  const pendingStatus: ShipmentStatus | undefined = SHIPMENT_STATUSES.find((s) => s.code === 'PENDING');
  const receivedStatus: ShipmentStatus | undefined = SHIPMENT_STATUSES.find((s) => s.code === 'RECEIVED'); // Use correct code
  // Only count shipments that are NOT delivered for the dashboard card
  const totalAwaiting = shipments.filter(s => s.status !== 'DELIVERED').length;
  const cards = [
    {
      title: "Total Awaiting",
      description: "Shipments not yet delivered",
      value: totalAwaiting,
      color: "bg-green-100 text-green-800 border-green-400",
    },
    ...(pendingStatus ? [{
      title: pendingStatus.label || "Pending",
      description: pendingStatus.description || "Shipments yet to be processed",
      value: shipments.filter(s => s.status === pendingStatus.code).length,
      color: STATUS_COLOR_MAP[pendingStatus.code] || "bg-yellow-100 text-yellow-800 border-yellow-400",
    }] : []),
    ...(receivedStatus ? [{
      title: receivedStatus.label || "Received",
      description: receivedStatus.description || "Ready to be transported",
      value: shipments.filter(s => s.status === receivedStatus.code).length,
      color: STATUS_COLOR_MAP[receivedStatus.code] || "bg-blue-100 text-blue-800 border-blue-400",
    }] : []),
  ];

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
        {/* Render each dashboard card using clean code best practices */}
        {cards.map((card) => (
          <AwaitingShipmentCard key={card.title} {...card} />
        ))}
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
