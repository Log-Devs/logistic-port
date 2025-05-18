// Professional API call with fallback to dummy data
export async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, dummyData?: T): Promise<T> {
	// Get the base URL from env, fallback to empty string for relative path
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
// Construct the full API URL, ensuring no double slashes
const url = `${baseUrl}${endpoint}`.replace(/([^:]\/)\/+/, "$1");
	try {
		const res = await fetch(url, options);
		if (!res.ok) throw new Error('API error');
		return await res.json();
	} catch (err) {
		// Fallback to dummy data if provided
		if (dummyData !== undefined) {
			// This is fallback dummy data for development/testing only
			return dummyData;
		}
		throw err;
	}
}
