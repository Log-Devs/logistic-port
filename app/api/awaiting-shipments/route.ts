import { NextResponse } from 'next/server';

// Dummy data for development and fallback
// DUMMY_SHIPMENTS: Production-ready dummy data for awaiting shipments
// Update this array to reflect the latest test cases for front-end development
const DUMMY_SHIPMENTS = [
  {
    id: "SHIP-001", // Unique shipment identifier
    recipient: "Austin Bediako", // Recipient name
    startLocation: "Accra", // Starting location
    destination: "Los Angeles", // Destination city
    items: 2, // Number of items in shipment
    weight: "50kg", // Total weight
    status: "Pending", // Current status
    arrival: "2023-10-01", // Expected arrival date
  },
  {
    id: "SHIP-002",
    recipient: "Caleb Adjei",
    startLocation: "Shanghai",
    destination: "New Jersey",
    items: 4,
    weight: "120kg",
    status: "Pending",
    arrival: "2023-10-03",
  },
  {
    id: "SHIP-003",
    recipient: "Rosemary Honuvor",
    startLocation: "Hamburg",
    destination: "Tema",
    items: 3,
    weight: "75kg",
    status: "Received",
    arrival: "2023-09-28",
  },
  {
    id: "SHIP-004",
    recipient: "Isaac Abakah",
    startLocation: "Dubai",
    destination: "London",
    items: 1,
    weight: "30kg",
    status: "Pending",
    arrival: "2023-10-05",
  },
  {
    id: "SHIP-005",
    recipient: "Emmanuel Cobbinah",
    startLocation: "Accra",
    destination: "Paris",
    items: 5,
    weight: "200kg",
    status: "Received",
    arrival: "2023-09-30",
  },
];

// PRODUCTION-READY: Always returns dummy data for now. To enable real API, update the handler below.
// Instructions for future: Replace the body of GET() to use process.env.REAL_AWAITING_SHIPMENTS_API_URL when backend is ready.
export async function GET() {
  // Always return dummy data until backend is ready
  return NextResponse.json(DUMMY_SHIPMENTS);
}
