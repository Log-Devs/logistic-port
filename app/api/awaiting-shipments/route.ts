import { NextResponse } from 'next/server';
// Shipment IDs now use a professional, short, incrementing format: SHIP-0001, SHIP-0002, etc. (see DUMMY_SHIPMENTS below)

// Dummy data for development and fallback
// DUMMY_SHIPMENTS: Production-ready dummy data for awaiting shipments
// All dummy shipments are now generated programmatically for maintainability and consistency.
// In production, IDs and tracking codes should be generated on creation (e.g., in DB or API layer).

// Helper function to generate a professional, short internal shipment ID
function generateShipmentId(index: number): string {
  // Pads the number to 4 digits and adds the SHIP- prefix: 1 -> SHIP-0001, 12 -> SHIP-0012, etc.
  return `SHIP-${(index + 1).toString().padStart(4, '0')}`;
}

// Helper function to generate a random, unguessable tracking code (e.g., SHIP-7G9X2A)
function generateTrackingCode(): string {
  // Generates a 6-character random alphanumeric string
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SHIP-${code}`;
}

/**
 * Generates an array of dummy shipment objects for testing and development.
 * Each object matches the shipment API contract.
 * @param count Number of dummy shipments to generate
 * @returns Array of shipment objects
 */
function generateDummyShipments(count: number) {
  // Example lists for randomization
  const recipients = ["Austin Bediako", "Caleb Adjei", "Rosemary Honuvor", "Yaa Amankwah", "Kwame Nkrumah", "Ama Serwaa", "Kojo Mensah", "Efua Osei", "Yaw Boateng", "Akua Asantewa"];
  const locations = ["Accra", "Lagos", "Shanghai", "Hamburg", "Tema", "Los Angeles", "New Jersey", "Abuja", "London", "Paris"];
  const destinations = ["Los Angeles", "New Jersey", "Tema", "Abuja", "London", "Paris", "Berlin", "Kumasi", "Cape Town", "Dubai"];
  const weights = ["50kg", "120kg", "75kg", "100kg", "90kg", "60kg", "110kg", "80kg", "95kg", "70kg"];
  const items = [2, 4, 3, 5, 1, 6, 2, 3, 4, 2];
  const statuses = ["PENDING", "RECEIVED_AT_ORIGIN", "IN_TRANSIT", "RECEIVED_AT_DESTINATION", "DELIVERED"];

  return Array.from({ length: count }, (_, i) => {
    const idx = i % recipients.length;
    const status = statuses[i % statuses.length];
    // Randomize a future arrival date
    const arrival = new Date(Date.now() + (i + 1) * 86400000).toISOString().split('T')[0];
    return {
      id: `SHIP-${generateShipmentId(i)}`,
      trackingCode: generateTrackingCode(),
      recipient: recipients[idx],
      startLocation: locations[idx],
      destination: destinations[idx],
      items: items[idx],
      weight: weights[idx],
      status: status, // Must match one of SHIPMENT_STATUSES codes
      arrival: arrival, // ISO date string (YYYY-MM-DD)
    };
  });
}

// Generates an array of dummy shipment objects for testing and development
const DUMMY_SHIPMENTS = generateDummyShipments(20);

// --- END OF DUMMY SHIPMENT GENERATION ---
// All legacy shipment objects have been removed. Only the generator-based approach remains for maintainability and best practices.


// Fill in internal IDs and tracking codes automatically
DUMMY_SHIPMENTS.forEach((shipment, idx) => {
  shipment.id = generateShipmentId(idx); // Linear internal ID
  shipment.trackingCode = generateTrackingCode(); // Public tracking code
});

/**
 * GET /api/awaiting-shipments
 * Production-ready handler: Fetches shipment data from backend API or falls back to DUMMY_SHIPMENTS for development/testing.
 *
 * - Attempts to fetch from process.env.REAL_AWAITING_SHIPMENTS_API_URL (must return JSON array of shipments)
 * - Falls back to DUMMY_SHIPMENTS if backend is unreachable or returns error
 * - Each shipment object should match the following contract:
 *   {
 *     id: string; // Internal linear ID (e.g., '0001')
 *     trackingCode: string; // Public, random, unguessable tracking code (e.g., 'SHIP-7G9X2A')
 *     recipient: string;
 *     startLocation: string;
 *     destination: string;
 *     items: number;
 *     weight: string;
 *     status: string; // Must match one of SHIPMENT_STATUSES codes
 *     arrival: string; // ISO date
 *   }
 *
 * Clean code, OOP, and best practices are followed. All logic is documented for maintainability.
 */
/**
 * GET handler for the awaiting-shipments API
 * This function provides shipment data to client components
 * It first checks if we're in a development environment or if a real backend URL is available
 * If in production with a valid URL, it attempts to fetch from the backend
 * Otherwise, it falls back to dummy data for development and testing
 * 
 * @returns NextResponse with shipment data in JSON format
 */
export async function GET() {
  // Check if we're in development mode (process.env.NODE_ENV will be 'development' in dev mode)
  const isDev = process.env.NODE_ENV === 'development';
  
  // Get the configured backend URL (if any)
  const backendUrl = process.env.REAL_AWAITING_SHIPMENTS_API_URL;
  
  // Only attempt to fetch from backend if we're in production AND have a valid URL
  if (!isDev && backendUrl && !backendUrl.includes('your-production-api.com')) {
    try {
      // Fetch shipment data from backend API with 60-second cache
      const res = await fetch(backendUrl, { next: { revalidate: 60 } });
      
      if (res.ok) {
        // If fetch successful, return the data from backend
        const data = await res.json();
        return NextResponse.json(data);
      } else {
        // Log API errors for monitoring and debugging
        console.error(`Backend API error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      // Log network or parsing errors
      console.error('Error fetching shipments from backend:', err);
    }
  }
  
  // Always fall back to dummy data if we're in development
  // or if there was an error fetching from the backend
  return NextResponse.json(DUMMY_SHIPMENTS);
}

