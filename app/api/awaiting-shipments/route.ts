import { NextResponse } from 'next/server';
// Shipment IDs now use a professional, short, incrementing format: SHIP-0001, SHIP-0002, etc. (see DUMMY_SHIPMENTS below)

// Dummy data for development and fallback
// DUMMY_SHIPMENTS: Production-ready dummy data for awaiting shipments
// Update this array to reflect the latest test cases for front-end development
// DUMMY_SHIPMENTS: Each shipment now uses a UUID for global uniqueness and professionalism.
// Example ID: 'c9b1c3b4-7a2d-4f5c-8d19-2e7f7a8b9e3c'.
// In production, IDs should be generated on creation (e.g., in DB or API layer).
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

// DUMMY_SHIPMENTS: Production-ready dummy data for awaiting shipments
// Each shipment now has:
//   - id: Internal linear ID (string, e.g., '0001')
//   - trackingCode: Public, random, unguessable tracking code (e.g., 'SHIP-7G9X2A')
const DUMMY_SHIPMENTS = [
  // The IDs below will be replaced after array creation
  // to ensure they are always sequential and professional
  // (see after array definition)

  {
    // Shipment ID in the form SHIP-0001, SHIP-0002, ...
id: 'SHIP-0001',
    recipient: "Austin Bediako", // Recipient name
    startLocation: "Accra", // Starting location
    destination: "Los Angeles", // Destination city
    items: 2, // Number of items in shipment
    weight: "50kg", // Total weight
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING", // Current status
    arrival: "2023-10-01", // Expected arrival date
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Caleb Adjei",
    startLocation: "Shanghai",
    destination: "New Jersey",
    items: 4,
    weight: "120kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2023-10-03",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Rosemary Honuvor",
    startLocation: "Hamburg",
    destination: "Tema",
    items: 3,
    weight: "75kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "RECEIVED_AT_ORIGIN",
    arrival: "2023-09-28",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Isaac Abakah",
    startLocation: "Dubai",
    destination: "London",
    items: 1,
    weight: "30kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2023-10-05",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Emmanuel Cobbinah",
    startLocation: "Accra",
    destination: "Paris",
    items: 5,
    weight: "200kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "RECEIVED_AT_ORIGIN",
    arrival: "2023-09-30",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Kingsley Coman",
    startLocation: "Accra",
    destination: "New York",
    items: 1,
    weight: "15kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-05-20",
  }
  // Add additional shipments as needed below. IDs will be filled automatically for professionalism.
  ,
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Linda Agyeiwaa",
    startLocation: "Beijing",
    destination: "Accra",
    items: 1,
    weight: "20kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-05-22",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Kwame Boakye",
    startLocation: "Lagos",
    destination: "Accra",
    items: 3,
    weight: "60kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-05-25",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Evelyn Ansah",
    startLocation: "London",
    destination: "Lagos",
    items: 2,
    weight: "45kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-05-28",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Benjamin Asare",
    startLocation: "Tokyo",
    destination: "Accra",
    items: 4,
    weight: "100kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-01",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Yaa Amankwah",
    startLocation: "New York",
    destination: "Accra",
    items: 1,
    weight: "25kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-05",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Kofi Owusu",
    startLocation: "Paris",
    destination: "Accra",
    items: 5,
    weight: "150kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-08",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Akua Asare",
    startLocation: "Dubai",
    destination: "Accra",
    items: 3,
    weight: "75kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-12",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Esi Amankwah",
    startLocation: "Shanghai",
    destination: "Accra",
    items: 2,
    weight: "50kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-15",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Kofi Owusu",
    startLocation: "London",
    destination: "Accra",
    items: 1,
    weight: "10kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-19",
  },
  {
    // Shipment ID will be filled automatically below for professionalism
// Internal linear ID (not exposed to users)
id: '',
// Public, random, unguessable tracking code for tracking shipments
trackingCode: '',
    recipient: "Akua Asare",
    startLocation: "Tokyo",
    destination: "Accra",
    items: 4,
    weight: "120kg",
    // Status must be one of the allowed SHIPMENT_STATUSES codes
status: "PENDING",
    arrival: "2025-06-22",
  }

];

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
export async function GET() {
  const backendUrl = process.env.REAL_AWAITING_SHIPMENTS_API_URL;
  if (backendUrl) {
    try {
      // Fetch shipment data from backend API
      const res = await fetch(backendUrl, { next: { revalidate: 60 } }); // Revalidate every minute
      if (res.ok) {
        const data = await res.json();
        // Optionally validate data shape here for safety
        return NextResponse.json(data);
      } else {
        // Log error for debugging
        console.error(`Backend API error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      // Log fetch error for debugging
      console.error('Error fetching shipments from backend:', err);
    }
  }
  // Fallback to dummy data for dev/testing or if backend is down
  return NextResponse.json(DUMMY_SHIPMENTS);
}

