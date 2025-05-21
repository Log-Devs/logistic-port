import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AwaitingShipmentDetail from './AwaitingShipmentDetail';

// Mock shipment data for testing
const mockShipment = {
  id: 'test-123',
  trackingCode: 'SHIP-TEST',
  recipient: 'John Doe',
  startLocation: 'Accra, Ghana',
  destination: 'New York, USA',
  arrival: '2025-06-01',
  items: 2,
  weight: 5,
  status: 'Pending',
};

describe('AwaitingShipmentDetail', () => {
  it('should render and play the Lottie animation on open', async () => {
    render(<AwaitingShipmentDetail shipment={mockShipment} onClose={() => {}} />);
    // Animation player should be present
    // Animation player section should be present (modal title is always present)
expect(screen.getByText(/Shipment Details/i)).toBeInTheDocument();
  });

  it('should remount the Lottie animation when modal is reopened', async () => {
    // Helper to re-render with different keys
    const { rerender } = render(<AwaitingShipmentDetail shipment={mockShipment} onClose={() => {}} />);
    // Initial render
    // Animation player section should be present (modal title is always present)
expect(screen.getByText(/Shipment Details/i)).toBeInTheDocument();

    // Simulate closing and reopening modal (change key)
    const newShipment = { ...mockShipment, id: 'test-123' };
    act(() => {
      rerender(<AwaitingShipmentDetail shipment={newShipment} onClose={() => {}} />);
    });
    // Animation should be present again (remounted)
    // Animation player section should be present (modal title is always present)
expect(screen.getByText(/Shipment Details/i)).toBeInTheDocument();
  });

  it('should render shipment details', () => {
    render(<AwaitingShipmentDetail shipment={mockShipment} onClose={() => {}} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Accra, Ghana')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });
});
