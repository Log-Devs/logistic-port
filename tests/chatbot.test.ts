import { getGreeting, getServiceIntro, getHistory, saveHistory, clearHistory, cacheResponse, getCachedResponse } from "../lib/chatbot";

describe("chatbot utils", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("returns correct greeting", () => {
		expect(getGreeting("TransGlobalFreight")).toMatch(/Good (morning|afternoon|evening)!/);
	});

	it("returns service intro", () => {
		expect(getServiceIntro("TransGlobalFreight")).toContain("freight shipping services");
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

	it("expires cache after 5 min", () => {
		const now = Date.now();
		localStorage.setItem("chatbot_cache_foo", JSON.stringify({ response: "bar", ts: now - 6 * 60 * 1000 }));
		expect(getCachedResponse("foo")).toBeNull();
	});
});
