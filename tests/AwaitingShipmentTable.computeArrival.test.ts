// Unit tests for computeArrival helper in AwaitingShipmentTable
// Ensures both code paths (DELIVERED and non-DELIVERED) are covered
// Clean code, OOP best practices, and full comments

import { describe, it, expect } from '@jest/globals';
import { AwaitingShipment } from '../app/client/components/AwaitingShipmentTable';

// Import the real computeArrival implementation for true production test coverage
// Import computeArrival from the dedicated module for accurate production logic
import { computeArrival } from '../app/client/components/computeArrival';

describe('computeArrival', () => {
    // Test: computeArrival returns the original arrival date for shipments with status 'DELIVERED'
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
        // For DELIVERED, should return the original arrival date
        expect(computeArrival(delivered)).toBe('2025-05-10');
    });

    // Additional test: DELIVERED with a different arrival date
    it('returns the correct arrival for DELIVERED shipments with different dates', () => {
        const delivered: AwaitingShipment = {
            id: '3',
            trackingCode: 'SHIP-DELIV',
            recipient: 'Alice',
            startLocation: 'C',
            destination: 'D',
            arrival: '2025-12-31',
            items: 3,
            weight: 15,
            status: 'DELIVERED',
        };
        // Should return the arrival date as-is
        expect(computeArrival(delivered)).toBe('2025-12-31');
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
        // The computeArrival function returns the date as YYYY-MM-DD (ISO format)
        // computeArrival returns ISO date string (YYYY-MM-DD) for all cases
        const expected = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0];
        expect(computeArrival(pending)).toBe(expected);
    });
});
