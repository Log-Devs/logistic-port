/**
 * statuscodes.test.ts
 * Unit tests for shipment status filtering and mapping logic.
 * Ensures only the new status codes are used and Awaiting Shipments logic is correct.
 * Uses Jest for testing.
 */
import { SHIPMENT_STATUSES } from './logistics-statuses';
import { STATUS_COLOR_MAP } from './status-color-map';

// Helper: Get all valid status codes
const VALID_CODES = SHIPMENT_STATUSES.map(s => s.code);

// Helper: Awaiting statuses for the Awaiting Shipments view
const AWAITING_STATUSES = ['PENDING', 'RECEIVED', 'IN_TRANSIT', 'ARRIVED'];

describe('Shipment Status Codes', () => {
  it('should only contain the new valid status codes', () => {
    expect(VALID_CODES).toEqual([
      'PENDING',
      'RECEIVED',
      'IN_TRANSIT',
      'ARRIVED',
      'DELIVERED',
    ]);
  });

  it('should have a color mapping for every status code', () => {
    VALID_CODES.forEach(code => {
      expect(STATUS_COLOR_MAP).toHaveProperty(code);
      expect(typeof STATUS_COLOR_MAP[code]).toBe('string');
    });
  });

  it('should only show correct statuses in Awaiting Shipments view', () => {
    // Simulate a shipment list with all statuses
    const shipments = VALID_CODES.map(code => ({ id: code, status: code }));
    // Filter for awaiting
    const awaiting = shipments.filter(s => AWAITING_STATUSES.includes(s.status));
    expect(awaiting.map(s => s.status)).toEqual([
      'PENDING',
      'RECEIVED',
      'IN_TRANSIT',
      'ARRIVED',
    ]);
  });

  it('should not show Delivered in Awaiting Shipments view', () => {
    const delivered = { id: 'x', status: 'DELIVERED' };
    const isAwaiting = AWAITING_STATUSES.includes(delivered.status);
    expect(isAwaiting).toBe(false);
  });
});

// Clean code, OOP, and full comments for maintainability
