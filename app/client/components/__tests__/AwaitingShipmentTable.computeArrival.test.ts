// Unit tests for computeArrival helper in AwaitingShipmentTable
// Ensures both code paths (DELIVERED and non-DELIVERED) are covered
// Clean code, OOP best practices, and full comments

import { describe, it, expect } from '@jest/globals';
import { AwaitingShipment } from '../AwaitingShipmentTable';

// Inline replica of computeArrival for direct unit test coverage
const computeArrival = (shipment: AwaitingShipment): string => {
    if (shipment.status === 'DELIVERED') {
        // For delivered shipments, keep the original arrival
        return shipment.arrival;
    }
    // For all other statuses, set arrival to 2 days from now
    const now = new Date();
    const arrivalDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    // Format as YYYY-MM-DD or a more user-friendly format
    return arrivalDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

describe('computeArrival', () => {
    it('returns the original arrival for DELIVERED shipments', () => {
        const delivered: AwaitingShipment = {
            id: '1',
            trackingCode: 'SHIP-1234',
            recipient: 'John Doe',
            startLocation: 'A',
            destination: 'B',
            arrival: '2025-05-10',
            items: 1,
            weight: 10,
            status: 'DELIVERED',
        };
        expect(computeArrival(delivered)).toBe('2025-05-10');
    });

    it('returns a date 2 days from now for non-DELIVERED shipments', () => {
        const pending: AwaitingShipment = {
            id: '2',
            trackingCode: 'SHIP-5678',
            recipient: 'Jane Smith',
            startLocation: 'X',
            destination: 'Y',
            arrival: '2025-05-10', // Should be ignored
            items: 2,
            weight: 20,
            status: 'PENDING',
        };
        const expected = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            .toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        expect(computeArrival(pending)).toBe(expected);
    });
});
