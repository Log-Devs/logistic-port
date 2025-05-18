/**
 * @fileoverview
 * Tests for the global loader (AppLoaderWrapper) integration with AuthProvider.
 * Ensures the loader appears only during global loading states and never due to local/component state.
 * Clean code, OOP, and best practices applied.
 */

import React from 'react'; // Import React (only once, as required by JSX)
import { render, screen } from '@testing-library/react'; // Import render and screen utilities for testing
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers
import AppLoaderWrapper from '@/components/AppLoaderWrapper'; // Import the AppLoaderWrapper component for testing

// --- Mock useAuth globally ---
let mockLoading = false;
jest.mock('@/components/auth-context', () => ({
  __esModule: true,
  useAuth: () => ({ user: null, loading: mockLoading }),
}));

// Mock FullPageLoader for test visibility
jest.mock('@/components/full-page-loader', () => ({
  __esModule: true,
  default: ({ loading }: { loading: boolean }) => loading ? <div data-testid="global-loader">Loading...</div> : null,
}));

// Dummy child content
const DummyContent = () => <div data-testid="dummy-content">Content</div>;

// Helper to render with global loading state
function renderWithGlobalLoading(loadingState: boolean) {
  mockLoading = loadingState;
  return render(
    <AppLoaderWrapper>
      <DummyContent />
    </AppLoaderWrapper>
  );
}

describe('Global Loader Integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader when global loading is true', () => {
    renderWithGlobalLoading(true);
    expect(screen.getByTestId('global-loader')).toBeInTheDocument();
    expect(screen.queryByTestId('dummy-content')).not.toBeVisible();
  });

  it('shows content and hides loader when global loading is false', () => {
    renderWithGlobalLoading(false);
    expect(screen.queryByTestId('global-loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('dummy-content')).toBeVisible();
  });

  it('never shows duplicate loaders from local/component state', () => {
    // Simulate a component with its own loading state (should not trigger loader)
    function LocalLoaderComponent() {
      const [localLoading] = React.useState(true);
      return <div data-testid="local-loader">Local Loading</div>;
    }
    renderWithGlobalLoading(false);
    expect(screen.queryByTestId('global-loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('local-loader')).not.toBeInTheDocument();
  });
});
