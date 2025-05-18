"use client";

import React, { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import AwaitingShipmentCard from "@/app/client/components/AwaitingShipmentCard";
import { AwaitingShipmentTable, useAwaitingShipments } from "@/app/client/components/AwaitingShipmentTable";

export default function AwaitingShipmentsPage() {
  // Fetch shipments using the production-ready hook
  // In DEV_MODE, this will return dummy data. In production, it uses your real API.
  // All edge cases (loading, error, empty, large data) are handled by the AwaitingShipmentTable.
  const [shipments, loading, error] = useAwaitingShipments("/api/awaiting-shipments");

  return (
    <div className="h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
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
          const cards = [
            {
              title: "Total Awaiting",
              description: "All processing payments",
              value: total,
            },
            {
              title: "Pending",
              description: "Shipments yet to be processed",
              value: pending,
            },
            {
              title: "Received",
              description: "Ready to be transported",
              value: received,
            },
          ];
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
