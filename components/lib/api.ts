// Professional API call with fallback to dummy data
export async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, dummyData?: T): Promise<T> {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
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
