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
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });;

  it("renders greeting and intro", () => {
    // Provide required props: isOpen and onClose
    const chatButtonRef = React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    const { getByText } = render(<ChatbotWindow onClose={() => { }} isOpen={true} chatButtonRef={chatButtonRef} />);
    expect(getByText(/Good morning!/)).toBeInTheDocument();
    // The intro message is added to history, not initial messages, so ensure it is present in the rendered output
    expect(getByText(/help you with TransGlobalFreight services/)).toBeInTheDocument();
  });

  it("sends user message and displays bot response", async () => {
    // Render a single ChatbotWindow and use RTL queries
    const chatButtonRef = React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
    const { getByTestId, getByText } = render(
      <ChatbotWindow onClose={() => {}} isOpen={true} chatButtonRef={chatButtonRef} />
    );
    // Simulate user typing and sending a message
    fireEvent.change(getByTestId("chatbot-input"), {
      target: { value: "What services do you offer?" },
    });
    fireEvent.click(getByTestId("chatbot-send"));
    // Wait for the bot response to appear
    await waitFor(() =>
      expect(getByText("Test bot response")).toBeInTheDocument()
    );
  });
});
// Removed custom getByTestId and getByText helpers; use RTL's built-in queries instead for better isolation and reliability.

