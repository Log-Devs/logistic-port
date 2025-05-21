"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import DashboardCard from "../components/dashboard-card";

// Dashboard card configuration with exact cards from the image
const dashboardCards = [
  {
    title: "Submit Shipment",
    description: "Create a new delivery",
    icon: "/submit-girl.png", // Person signing for package
    href: "/client/submit-shipment",
    iconComponent: "box" // Using the box icon from the image
  },
  {
    title: "Awaiting Deliveries",
    description: "View pending deliveries",
    icon: "/awaiting-time.png", // Stopwatch with boxes
    href: "/client/awaiting-shipments",
    iconComponent: "clock-delivery" // Using the clock icon from the image
  },
  {
    title: "Shipment History",
    description: "Visit previous orders",
    icon: "/shipment-history.jpg", // Smiling courier with boxes
    href: "/client/shipment-history",
    iconComponent: "history" // Using the history icon from the image
  },
  {
    title: "Track Shipment",
    description: "Receive Live Updates on delivery",
    icon: "/track.png", // Map with pins
    href: "/client/track-shipment",
    iconComponent: "location" // Using the location icon from the image
  },
];

/**
 * Dashboard page for Logistics app
 * - Matches the exact design from the provided image
 */
const ClientDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="w-full px-2 md:px-12 py-8 bg-white min-h-screen">
      {/* Welcome Header - exactly as in the image */}
      <h1 className="text-3xl font-semibold mb-6">Welcome</h1>
      
      {/* Prompt - exactly as in the image */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold">What would you like to do?</h2>
      </div>
      
      {/* 2x2 Grid of Dashboard Cards - exact layout from image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            imageSrc={card.icon}
            iconComponent={card.iconComponent}
            onClick={() => router.push(card.href)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;