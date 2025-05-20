// status-color-map.ts
// Shared color map for shipment statuses used across dashboard and table
// Maintains a single source of truth for status colors
// Always update this file if you add or change statuses in SHIPMENT_STATUSES

// status-color-map.ts
// Single source of truth for shipment status color classes.
// Only valid codes: Pending, Received, In Transit, Arrived, Delivered.
// Keep in sync with SHIPMENT_STATUSES and statuscodes.md.

export const STATUS_COLOR_MAP: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  RECEIVED: "bg-blue-100 text-blue-800 border-blue-200",
  IN_TRANSIT: "bg-purple-100 text-purple-800 border-purple-200",
  ARRIVED: "bg-green-100 text-green-800 border-green-200",
  DELIVERED: "bg-gray-100 text-gray-800 border-gray-200",
};

