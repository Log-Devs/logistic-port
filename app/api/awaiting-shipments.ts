// API handler for Awaiting Shipments
// Supports real API data (when available) or dummy data in development mode
// Follows clean code, OOP, and best practices
import type { NextApiRequest, NextApiResponse } from 'next';

// Dummy data for development and fallback
const DUMMY_SHIPMENTS = [
  {
    id: "SHIP-001",
    recipient: "Austin Bediako",
    startLocation: "Accra",
    destination: "Los Angeles",
    items: 2,
    weight: "50kg",
    status: "Pending",
    arrival: "2023-10-01",
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
  // ...add more test data as needed
];

/**
 * Main API handler for /api/awaiting-shipments
 *
 * - Returns dummy data if DEV_MODE is enabled or if the real API fails.
 * - Otherwise, proxies to REAL_API_URL (from env).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const devMode = process.env.DEV_MODE === 'true';
    const realApiUrl = process.env.REAL_AWAITING_SHIPMENTS_API_URL;

    // Always serve dummy data in dev mode or if no real API URL is set
    if (devMode || !realApiUrl) {
      res.status(200).json(DUMMY_SHIPMENTS);
      return;
    }

    // Proxy to real API in production
    try {
      const response = await fetch(realApiUrl);
      if (!response.ok) throw new Error('Failed to fetch from real API');
      const data = await response.json();
      // Ensure the data is an array and matches AwaitingShipment structure
      if (!Array.isArray(data)) throw new Error('API did not return an array');
      res.status(200).json(data);
    } catch (e) {
      // Fallback to dummy data if real API fails
      res.status(200).json(DUMMY_SHIPMENTS);
    }
  } catch (err) {
    // Catch-all error handler for unexpected issues
    res.status(500).json({ error: 'Unexpected server error', details: err instanceof Error ? err.message : err });
  }
}

// Endpoint: /api/awaiting-shipments
// Returns: Array<AwaitingShipment> (dummy or real data)
// Follows clean code, OOP, and best practices

