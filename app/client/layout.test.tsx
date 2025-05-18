// layout.test.tsx
// Unit/integration tests for responsive sidebar logic in Layout
// Ensures correct behavior for mobile/desktop resize events and sidebar state

import React from 'react'; // React for rendering components
import { render, cleanup } from '@testing-library/react'; // Testing utilities
import '@testing-library/jest-dom'; // For extended matchers like toHaveClass
import Layout from './layout'; // Layout component to test

// Helper function to mock window.innerWidth and dispatch resize event
function defineGlobalResize(width: number) {
  // Set window.innerWidth to the desired value
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  // Dispatch a resize event to trigger useEffect listeners
  window.dispatchEvent(new Event('resize'));
}

// Clean up after each test to prevent test pollution
afterEach(() => {
  cleanup();
});

describe('Layout responsive sidebar', () => {
  it('should default sidebar closed on mobile', () => {
    defineGlobalResize(500); // Mobile width
    const { getByTestId } = render(<Layout><div>Test</div></Layout>);
    expect(getByTestId('sidebar')).toHaveClass('hidden');
  });

  it('should default sidebar open on desktop', () => {
    defineGlobalResize(1200); // Desktop width
    const { getByTestId } = render(<Layout><div>Test</div></Layout>);
    expect(getByTestId('sidebar')).not.toHaveClass('hidden');
  });

  // To test sidebar toggle, uncomment the following and ensure 'sidebar-toggle' test ID exists in Layout:
  // import { fireEvent } from '@testing-library/react';
  // it('should toggle sidebar when hamburger is clicked on mobile', () => {
  //   defineGlobalResize(500);
  //   const { getByTestId } = render(<Layout><div>Test</div></Layout>);
  //   const hamburger = getByTestId('sidebar-toggle');
  //   fireEvent.click(hamburger);
  //   expect(getByTestId('sidebar')).not.toHaveClass('hidden');
  // });

});

// Note: Add data-testid attributes to sidebar and toggle in Layout for robust test selection.
// These tests ensure the responsive logic is correct for mobile/desktop scenarios.
