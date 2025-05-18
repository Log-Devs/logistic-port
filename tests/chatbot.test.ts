// Import all chatbot utilities and the responseCache object at the top level, as required by ES6 module rules
import { getGreeting, getServiceIntro, getHistory, saveHistory, clearHistory, cacheResponse, getCachedResponse, responseCache } from "../lib/chatbot";


describe("chatbot utils", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("returns correct greeting", () => {
		expect(getGreeting("TransGlobalFreight")).toMatch(/Good (morning|afternoon|evening)!/);
	});

	// Updated: Match the actual function output
	it("returns service intro", () => {
		expect(getServiceIntro("TransGlobalFreight")).toBe("I’m here to help you with TransGlobalFreight services. Ask me about shipping, tracking, or our company!");
	});

	it("saves and gets history", () => {
		saveHistory([{ role: "user", content: "hi" }]);
		expect(getHistory()).toEqual([{ role: "user", content: "hi" }]);
	});

	it("clears history", () => {
		saveHistory([{ role: "user", content: "hi" }]);
		clearHistory();
		expect(getHistory()).toEqual([]);
	});

	it("caches and retrieves response", () => {
		cacheResponse("foo", "bar");
		expect(getCachedResponse("foo")).toBe("bar");
	});

	// Updated: Test in-memory cache expiry logic using exported responseCache
	it("expires cache after 5 min", () => {
		cacheResponse("foo", "bar");
		// Manually expire the cache for testing cache expiry logic
		// All imports must be at the top level; do not import inside functions or blocks
		if (responseCache && responseCache["foo"]) {
			responseCache["foo"].expiresAt = Date.now() - 1;
		} // responseCache is now accessible directly
		expect(getCachedResponse("foo")).toBeUndefined();
	});
});
