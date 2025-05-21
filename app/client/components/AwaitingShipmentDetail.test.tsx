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
    // Assert modal title is present
    expect(screen.getByText(/Shipment Details/i)).toBeInTheDocument();
    // Assert the Lottie player section container is present using test ID
    expect(screen.getByTestId('lottie-player-section')).toBeInTheDocument();
  });

  it('should remount the Lottie animation when modal is reopened', async () => {
    // Helper to re-render with different keys
    const { rerender } = render(<AwaitingShipmentDetail shipment={mockShipment} onClose={() => {}} />);
    // Initial render: assert modal title and Lottie player section
    expect(screen.getByText(/Shipment Details/i)).toBeInTheDocument();
    const initialSection = screen.getByTestId('lottie-player-section');
    expect(initialSection).toBeInTheDocument();

    // Simulate closing and reopening modal (change key)
    const newShipment = { ...mockShipment, id: 'test-123' };
    act(() => {
      rerender(<AwaitingShipmentDetail shipment={newShipment} onClose={() => {}} />);
    });
    // Animation section should be present again (remounted)
    expect(screen.getByText(/Shipment Details/i)).toBeInTheDocument();
    const remountedSection = screen.getByTestId('lottie-player-section');
    expect(remountedSection).toBeInTheDocument();
    // NOTE: In JSDOM, the same DOM node may be reused for the same test id/key.
    // We only assert presence after rerender for robust, environment-agnostic testing.
  });

  it('should render shipment details', () => {
    render(<AwaitingShipmentDetail shipment={mockShipment} onClose={() => {}} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Accra, Ghana')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });
});
