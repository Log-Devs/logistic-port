// computeArrival.ts
// Clean code, OOP, and best practices: Module for computing shipment arrival dates
// Ensures consistent ISO date formatting for all consumers (UI, tests, API)

import { AwaitingShipment } from './AwaitingShipmentTable';

/**
 * computeArrival
 * Returns the expected arrival date for a shipment in ISO format (YYYY-MM-DD).
 * - For DELIVERED shipments, returns the original arrival date in ISO format.
 * - For all other statuses, sets arrival to 2 days from now in ISO format.
 * This ensures consistency for UI display, tests, and API integrations.
 *
 * @param shipment - The AwaitingShipment object
 * @returns Arrival date as a string in ISO format (YYYY-MM-DD)
 */
export const computeArrival = (shipment: AwaitingShipment): string => {
    // Convert any date input to ISO format (YYYY-MM-DD) for reliability
    const toISO = (date: string | Date) => new Date(date).toISOString().split('T')[0];
    if (shipment.status === 'DELIVERED') {
        // For delivered shipments, return the original arrival in ISO format
        return toISO(shipment.arrival);
    }
    // For all other statuses, set arrival to 2 days from now, in ISO format
    const now = new Date();
    const arrivalDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    return toISO(arrivalDate);
};
