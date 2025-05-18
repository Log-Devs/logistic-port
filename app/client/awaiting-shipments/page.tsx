"use client";

import React, { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import AwaitingShipmentCard from "@/components/ui/client-dashboard/awaiting-shipment/AwaitingShipmentCard";
import AwaitingShipmentTable from "@/components/ui/client-dashboard/awaiting-shipment/AwaitingShipmentTable";

export default function AwaitingShipmentsPage() {
  const [awaitingShipments, setAwaitingShipments] = useState([
    {
      id: "SHIP-001",
      recipient: "Austin Bediako",
      startLocation: "Accra",
      destination: "Los Angeles",
      items: 2,
      weight: "50kg",
      status: "Pending",
      arrival: "2023-10-01",
    },
    {
      id: "SHIP-002",
      recipient: "Caleb Adjei",
      startLocation: "Shanghai",
      destination: "New Jersey",
      items: 4,
      weight: "120kg",
      status: "Pending",
      arrival: "2023-10-03",
    },
    {
      id: "SHIP-003",
      recipient: "Rosemary Honuvor",
      startLocation: "Hamburg",
      destination: "Tema",
      items: 3,
      weight: "75kg",
      status: "Received",
      arrival: "2023-09-28",
    },
    {
      id: "SHIP-004",
      recipient: "Isaac Abakah",
      startLocation: "Dubai",
      destination: "London",
      items: 1,
      weight: "30kg",
      status: "Pending",
      arrival: "2023-10-05",
    },
    {
      id: "SHIP-005",
      recipient: "Emmanuel Cobbinah",
      startLocation: "Accra",
      destination: "Paris",
      items: 5,
      weight: "200kg",
      status: "Received",
      arrival: "2023-09-30",
    },
  ]);

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
        {[
          {
            title: "Total Awaiting",
            description: "All processing payments",
            value: 5,
          },
          {
            title: "Pending",
            description: "Shipments yet to be processed",
            value: 3,
          },
          {
            title: "Received",
            description: "Ready to be transported",
            value: 2,
          },
        ].map((card) => (
          <AwaitingShipmentCard key={card.title} {...card} />
        ))}
      </div>

      {/* Awaiting Shipments List/Table */}
      <div>
        <AwaitingShipmentTable awaitingShipments={awaitingShipments} />
      </div>
    </div>
  );
}
