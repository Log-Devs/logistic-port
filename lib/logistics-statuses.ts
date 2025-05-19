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
    description: 'Package registered and awaiting drop-off or pickup by company.'
  },
  {
    code: 'RECEIVED_AT_ORIGIN',
    label: 'Received at Origin Warehouse',
    description: 'Package received at the origin warehouse and ready for transport.'
  },
  {
    code: 'READY_FOR_TRANSPORT',
    label: 'Ready for Transport',
    description: 'Package is ready and queued for international transport.'
  },
  {
    code: 'IN_TRANSIT',
    label: 'In Transit',
    description: 'Package is currently being transported to the destination country.'
  },
  {
    code: 'RECEIVED_AT_DESTINATION',
    label: 'Received at Destination Warehouse',
    description: 'Package received in the destination country warehouse.'
  },
  {
    code: 'READY_FOR_PICKUP',
    label: 'Ready for Pickup',
    description: 'Package is ready for recipient pickup at the destination warehouse.'
  },
  {
    code: 'OUT_FOR_DELIVERY',
    label: 'Out for Delivery',
    description: 'Package is being delivered to the recipient’s address.'
  },
  {
    code: 'DELIVERED',
    label: 'Delivered',
    description: 'Package has been delivered to the recipient.'
  }
] as const;

// Type for strong typing in all apps
export type ShipmentStatusCode = typeof SHIPMENT_STATUSES[number]['code'];
