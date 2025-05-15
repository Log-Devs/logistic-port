import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ChatbotWindow from "../components/ChatbotWindow";

jest.mock("../lib/chatbot", () => ({
  getGreeting: () => "Good morning! Welcome to TransGlobalFreight.",
  getServiceIntro: () =>
    "I’m here to help you with TransGlobalFreight services.",
  getHistory: () => [],
  saveHistory: jest.fn(),
  clearHistory: jest.fn(),
  sendChatbotMessage: jest.fn().mockResolvedValue("Test bot response"),
  cacheResponse: jest.fn(),
  getCachedResponse: () => null,
}));

describe("ChatbotWindow", () => {
  it("renders greeting and intro", () => {
    const { getByText } = render(<ChatbotWindow onClose={() => {}} />);
    expect(getByText(/Good morning!/)).toBeInTheDocument();
    expect(getByText(/I’m here to help/)).toBeInTheDocument();
  });

  it("sends user message and displays bot response", async () => {
    const { getByTestId, getByText } = render(
      <ChatbotWindow onClose={() => {}} />
    );
    const input = getByTestId("chatbot-input");
    fireEvent.change(input, {
      target: { value: "What services do you offer?" },
    });
    fireEvent.click(getByTestId("chatbot-send"));
    await waitFor(() =>
      expect(getByText("Test bot response")).toBeInTheDocument()
    );
  });
});
