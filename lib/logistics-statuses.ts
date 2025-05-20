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
/**
 * SHIPMENT_STATUSES: Single source of truth for shipment status codes in the logistics workflow.
 *
 * Only these codes are valid:
 * - Pending: User submitted form, awaiting warehouse check-in.
 * - Received: Warehouse admin checked in/processed at warehouse.
 * - In Transit: Packed and left warehouse, en route.
 * - Arrived: Arrived in destination country, not yet delivered.
 * - Delivered: Delivered to recipient.
 *
 * Use these for all business logic, UI, and API.
 */
export const SHIPMENT_STATUSES = [
  {
    code: 'PENDING',
    label: 'Pending',
    description: 'User has filled a form to submit a good. The shipment is awaiting initial warehouse check-in or pickup.'
  },
  {
    code: 'RECEIVED',
    label: 'Received',
    description: 'Warehouse admin has checked in the product after it was brought or picked up and processed at the warehouse.'
  },
  {
    code: 'IN_TRANSIT',
    label: 'In Transit',
    description: 'The good is packed and has left the warehouse; it is currently on the way to the destination country.'
  },
  {
    code: 'ARRIVED',
    label: 'Arrived',
    description: 'Shipment has reached the destination country but has not yet been delivered to the recipient.'
  },
  {
    code: 'DELIVERED',
    label: 'Delivered',
    description: 'Shipment has been delivered to the recipient.'
  }
] as const;

/**
 * ShipmentStatus: Type for a single shipment status object in SHIPMENT_STATUSES.
 * Use this for type safety in all business logic and UI code.
 */
export type ShipmentStatus = typeof SHIPMENT_STATUSES[number];

/**
 * ShipmentStatusCode: Type-safe union of all valid shipment status codes.
 */
export type ShipmentStatusCode = typeof SHIPMENT_STATUSES[number]['code'];
