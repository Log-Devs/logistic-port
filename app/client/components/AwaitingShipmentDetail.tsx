// TypeScript fix: declare the custom <dotlottie-player> element for JSX/TSX
// This enables TypeScript to recognize the web component as a valid JSX element
// See README for details and web component usage
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string | number;
        style?: React.CSSProperties;
        loop?: boolean;
        autoplay?: boolean;
        [key: string]: any;
      };
    }
  }
}

import React from "react";
import { Package, MapPin, Calendar, Scale, Tag, Truck, User, Clock } from "lucide-react";
// Import shared status color map and status list for consistent status badge coloring
import { STATUS_COLOR_MAP } from '@/lib/status-color-map';
import { SHIPMENT_STATUSES } from '@/lib/logistics-statuses';


/**
 * AwaitingShipment type definition (moved from AwaitingShipmentTable.tsx for modal type safety and lint compliance)
 * Represents a single shipment awaiting processing.
 */
interface AwaitingShipment {
  id: string | number; // Internal use only
  trackingCode: string; // Public tracking code (e.g., SHIP-7G9X2A)
  recipient: string;
  startLocation: string;
  destination: string;
  arrival: string;
  items: number;
  weight: string | number;
  status: string; // Must be one of SHIPMENT_STATUSES codes
}

/**
 * Props for the AwaitingShipmentDetail modal component
 * - shipment: The shipment to display details for
 * - onClose: Handler to close the modal
 */
interface AwaitingShipmentDetailProps {
  shipment: AwaitingShipment | null;
  onClose: () => void;
}

/**
 * Get the appropriate status badge color based on shipment status
 */
const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    "Processing": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Awaiting": "bg-blue-100 text-blue-800 border-blue-200",
    "In Transit": "bg-purple-100 text-purple-800 border-purple-200",
    "Delayed": "bg-red-100 text-red-800 border-red-200",
    "Delivered": "bg-green-100 text-green-800 border-green-200",
    "Canceled": "bg-gray-100 text-gray-800 border-gray-200"
  };
  
  return statusMap[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

/**
 * Progress indicator for shipment journey
 */
const ShipmentProgress: React.FC<{ status: string }> = ({ status }) => {
  const steps = ["Processing", "Awaiting", "In Transit", "Delivered"];
  const currentStep = steps.indexOf(status) !== -1 ? steps.indexOf(status) : 1;
  
  return (
    <div className="my-6">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={step} className="text-xs font-medium text-center">
            {step}
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full" />
        <div 
          className="absolute top-0 h-2 bg-primary rounded-full transition-all duration-300" 
          style={{ width: `${Math.max((currentStep / (steps.length - 1)) * 100, 5)}%` }}
        />
        {steps.map((step, index) => (
          <div 
            key={step}
            className={`absolute top-0 w-4 h-4 rounded-full -mt-1 transform -translate-x-1/2 ${
              index <= currentStep ? 'bg-primary' : 'bg-gray-200'
            } border-2 border-white`}
            style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Map visualization placeholder component
 */
const RouteMapPreview: React.FC<{ from: string; to: string }> = ({ from, to }) => (
  <div className="relative mt-4 mb-6 rounded-lg overflow-hidden bg-gray-100 h-32">
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center text-gray-500">
        <MapPin className="mb-1" size={20} />
        <span className="text-xs">Route map preview</span>
      </div>
    </div>
    <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs shadow">
      {from} → {to}
    </div>
  </div>
);

/**
 * AwaitingShipmentDetail
 * Enhanced professional modal for displaying all details about a shipment.
 * Includes visual indicators, icons, and responsive design.
 */
const AwaitingShipmentDetail: React.FC<AwaitingShipmentDetailProps> = ({ shipment, onClose }) => {
  // Add Escape key listener for accessibility and UX
  React.useEffect(() => {
    // Handler to close modal on Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(); // Close modal
      }
    };
    // Attach event listener when modal mounts
    window.addEventListener('keydown', handleKeyDown);
    // Clean up event listener when modal unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // If no shipment is provided, do not render the modal
  if (!shipment) return null;
  
  // Format weight to always show units
  const formattedWeight = typeof shipment.weight === 'number' 
    ? `${shipment.weight} kg` 
    : shipment.weight;

  // Professional, mobile-friendly modal overlay:
  // - On desktop: centered modal with max-width/height and scrollable content.
  // - On mobile: bottom sheet style, rounded top corners, max-h-90vh, scrollable content, overlay does NOT block scroll.
  // - Clean code: all styles are responsive and commented.
  // - Accessibility: aria-modal, role, click outside to close.
  // Fix: Properly return a single parent <div> for the overlay, with all attributes in the correct place.
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black bg-opacity-40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ overscrollBehavior: 'contain' }}
    >
      <div
        className={`w-full max-w-lg bg-white dark:bg-slate-800 shadow-2xl animate-fade-in overflow-y-auto overflow-x-hidden`}
        // Professional: Hide horizontal overflow to prevent accidental scrollbars or content bleed
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
        tabIndex={-1}
      > 
      {/* // Fixed: removed stray closing curly brace and corrected props */}

        {/* Modal header with action buttons */}
        <div className="bg-gray-50 dark:bg-slate-700 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-slate-600">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Package className="mr-2" size={20} />
            Shipment Details
          </h2>
          <div className="flex gap-2">
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              onClick={onClose}
              aria-label="Close details modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Tracking code highlight section */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Tracking Number</div>
              <div className="text-lg font-mono font-semibold text-primary dark:text-primary-light">
                {shipment.trackingCode}
              </div>
            </div>
            {/*
              Render the status badge using the same STATUS_COLOR_MAP and label logic as the table for consistency.
              This ensures the badge color and text match across all views.
            */}
            {(() => {
              // Import shared status color map and status list
              // (import at top: import { STATUS_COLOR_MAP } from '@/lib/status-color-map'; import { SHIPMENT_STATUSES } from '@/lib/logistics-statuses';)
              const statusObj = SHIPMENT_STATUSES.find(s => s.code === shipment.status);
              const label = statusObj ? statusObj.label : shipment.status;
              const description = statusObj ? statusObj.description : '';
              const colorClass = STATUS_COLOR_MAP[shipment.status] || 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
              return (
                <span
                  title={description}
                  className={`mt-2 sm:mt-0 rounded-full px-3 py-1 text-sm font-medium border whitespace-nowrap ${colorClass}`}
                >
                  {label}
                </span>
              );
            })()}

          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="px-6 pt-4">
          <ShipmentProgress status={shipment.status} />
        </div>
        
        {/* Lottie Animation Preview Section (replaces map preview) */}
        {/*
          The following Lottie animation visually represents shipment movement.
          The script is loaded only once in the browser for performance and SSR safety.
        */}
        {/*
          Professional fix: Dynamically load the dotlottie-player web component only on the client using useEffect.
          This ensures the animation always renders after hydration and SSR, following React best practices.
        */}
        <LottiePlayerSection />
        
        {/* Shipment details grid */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailCard 
              icon={<User size={18} />}
              label="Recipient"
              value={shipment.recipient}
            />
            <DetailCard 
              icon={<Calendar size={18} />}
              label="Expected Arrival"
              value={shipment.arrival}
            />
            <DetailCard 
              icon={<Package size={18} />}
              label="Items"
              value={`${shipment.items} ${parseInt(String(shipment.items)) === 1 ? 'item' : 'items'}`}
            />
            <DetailCard 
              icon={<Scale size={18} />}
              label="Weight"
              value={formattedWeight}
            />
            <DetailCard 
              icon={<MapPin size={18} />}
              label="Origin"
              value={shipment.startLocation}
            />
            <DetailCard 
              icon={<MapPin size={18} />}
              label="Destination"
              value={shipment.destination}
            />
            {/*
              Only show the public tracking ID to the user for security and privacy.
              The internal ID is no longer displayed.
              This follows clean code and UX best practices.
            */}
            <DetailCard 
              icon={<Tag size={18} />}
              label="Tracking ID"
              value={shipment.trackingCode}
              className="text-xs font-mono text-primary"
            />
          </div>
        </div>
        
        {/* Footer with action buttons */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600 flex justify-end gap-3">
          <button 
            className="px-4 py-2 bg-white dark:bg-slate-600 border border-gray-300 dark:border-gray-500 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-500 transition-colors text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>
          {/*
            The Track Shipment feature is not yet available. This button is disabled and shows a tooltip and a toast on click.
            Clean code: visually indicate the feature is coming soon, prevent selection, and provide professional UX feedback.
          */}
          <button
            className="px-4 py-2 bg-primary text-white rounded-md transition-colors text-sm font-medium flex items-center opacity-60 cursor-not-allowed relative group select-none"
            disabled
            tabIndex={-1}
            onClick={(e) => {
              e.preventDefault();
              // Show a professional message using a toast or alert
              if (typeof window !== 'undefined' && window?.toast) {
                window.toast({
                  title: 'Tracking Unavailable',
                  description: 'Shipment tracking is not yet available. Please check back soon.',
                  variant: 'info',
                });
              } else {
                alert('Shipment tracking is not yet available. Please check back soon.');
              }
            }}
            aria-disabled="true"
            title="Shipment tracking is not yet available."
          >
            <Truck size={16} className="mr-1" />
            Track Shipment
            {/* Tooltip on hover */}
            <span className="absolute left-1/2 -top-10 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10 shadow-lg">
              Shipment tracking is not yet available.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * DetailCard
 * Enhanced card component for displaying shipment details with icons
 */
const DetailCard: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  value: React.ReactNode;
  className?: string;
}> = ({ icon, label, value, className = "" }) => (
  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 border border-gray-200 dark:border-slate-600">
    <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400 text-sm">
      {icon}
      <span>{label}</span>
    </div>
    <div className={`text-gray-900 dark:text-white font-medium ${className}`}>
      {value}
    </div>
  </div>
);

/**
 * LottiePlayerSection
 * Professional, client-only loader for the dotlottie-player web component.
 * Ensures the Lottie animation always renders after hydration and SSR.
 * Uses useEffect for dynamic script loading and a React ref for the player.
 * Shows a fallback message if the component fails to load.
 */
const LottiePlayerSection: React.FC = () => {
  const playerRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    // Only load the script if window is defined (client-side)
    if (typeof window === 'undefined') return;
    // Prevent loading multiple times
    if (document.querySelector('script[data-dotlottie-player]')) {
      setLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    script.type = 'module';
    script.async = true;
    script.setAttribute('data-dotlottie-player', 'true');
    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);
    document.body.appendChild(script);
    // Clean up if component unmounts
    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  return (
    <div className="px-6 flex justify-center items-center my-4 w-full">
      {error ? (
        <div className="text-red-500 text-sm">Animation failed to load.</div>
      ) : (
        // Responsive container for the Lottie animation
        <div ref={playerRef} className="w-full flex justify-center">
          {/*
            Use the custom element only after the script is loaded.
            Responsive: 100% width on mobile, 480px on desktop.
          */}
          {loaded ? (
            <dotlottie-player
              src="https://lottie.host/476832d6-b952-454f-8d3b-dbe814f04d83/6IvdD4bQFr.lottie"
              background="transparent"
              speed="1"
              style={{ width: '100%', maxWidth: 480, height: 240 }}
              loop
              autoplay
            />
          ) : (
            <div className="text-gray-400 text-sm py-12">Loading animation...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AwaitingShipmentDetail;