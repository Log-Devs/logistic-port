/**
 * ShipmentStatus: Professional, cross-app shipment status constants for logistics workflow.
 * Use these in client, admin, and warehouse apps for consistency and type safety.
 *
 * - code: Internal code for logic, API, and DB
 * - label: User-facing string for UI
 * - description: Optional, for tooltips or admin panels
 *
 * Status flow covers: registration → origin warehouse → transport → destination warehouse → pickup/delivery → delivered
 */
export const SHIPMENT_STATUSES = [
  {
    code: 'PENDING',
    label: 'Pending',
    description: 'Awaiting Drop-off'
  },
  {
    code: 'RECEIVED_AT_ORIGIN',
    label: 'Received',
    description: 'Origin Warehouse'
  },
  {
    code: 'READY_FOR_TRANSPORT',
    label: 'Ready to Ship',
    description: 'Queued' // Changed from 'Queued for Transport' to concise phrase
  },
  {
    code: 'IN_TRANSIT',
    label: 'In Transit',
    description: 'En Route' // Changed from 'Package is currently being transported to the destination country.' to concise phrase
  },
  {
    code: 'RECEIVED_AT_DESTINATION',
    label: 'Received at Destination',
    description: 'Destination' // Changed from 'Destination Warehouse' to concise phrase
  },
  {
    code: 'READY_FOR_PICKUP',
    label: 'Ready for Pickup',
    description: 'Ready for Pickup'
  },
  {
    code: 'OUT_FOR_DELIVERY',
    label: 'Out for Delivery',
    description: 'Delivering'
  },
  {
    code: 'DELIVERED',
    label: 'Delivered',
    description: 'Completed'
  }
] as const;

// Type for strong typing in all apps
export type ShipmentStatusCode = typeof SHIPMENT_STATUSES[number]['code'];
