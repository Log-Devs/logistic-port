// status-color-map.ts
// Shared color map for shipment statuses used across dashboard and table
// Maintains a single source of truth for status colors
// Always update this file if you add or change statuses in SHIPMENT_STATUSES

export const STATUS_COLOR_MAP: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-400",
  RECEIVED_AT_ORIGIN: "bg-blue-100 text-blue-800 border-blue-400",
  READY_FOR_TRANSPORT: "bg-blue-100 text-blue-800 border-blue-400",
  IN_TRANSIT: "bg-red-100 text-red-800 border-red-400",
  RECEIVED_AT_DESTINATION: "bg-blue-100 text-blue-800 border-blue-400",
  READY_FOR_PICKUP: "bg-blue-100 text-blue-800 border-blue-400",
  OUT_FOR_DELIVERY: "bg-blue-100 text-blue-800 border-blue-400",
  DELIVERED: "bg-green-100 text-green-800 border-green-400",
};
