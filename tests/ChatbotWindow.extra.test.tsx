// Additional robust tests for ChatbotWindow
// Clean code, OOP, and best-practice test patterns
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ChatbotWindow from "../components/ChatbotWindow";

jest.mock("../lib/chatbot", () => ({
  getGreeting: () => "Good morning! Welcome to TransGlobalFreight.",
  getServiceIntro: () =>
    "I'm here to help you with TransGlobalFreight services.",
  getHistory: () => [],
  saveHistory: jest.fn(),
  clearHistory: jest.fn(),
  sendChatbotMessage: jest.fn().mockResolvedValue("Test bot response"),
  cacheResponse: jest.fn(),
  getCachedResponse: () => null,
}));
// Add this to mock window.scrollTo for jsdom
beforeAll(() => {
  window.scrollTo = jest.fn();
});
const chatButtonRef: React.RefObject<HTMLDivElement | null> = React.createRef();

describe("ChatbotWindow - Advanced UI and Logic", () => {
  it("disables send button when input is empty or loading", () => {
    const { getByTestId } = render(
      <ChatbotWindow onClose={() => { }} isOpen={true} chatButtonRef={chatButtonRef} />
    );
    const sendBtn = getByTestId("chatbot-send");
    expect(sendBtn).toBeDisabled();
  });

  it("enables send button when input is non-empty", () => {
    const { getByTestId } = render(
      <ChatbotWindow onClose={() => { }} isOpen={true} chatButtonRef={React.createRef()} />
    );
    const input = getByTestId("chatbot-input");
    const sendBtn = getByTestId("chatbot-send");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(sendBtn).not.toBeDisabled();
  });

  it("triggers send on Enter key press", async () => {
    const { getByTestId, getByText } = render(
      <ChatbotWindow onClose={() => { }} isOpen={true} chatButtonRef={React.createRef()} />
    );
    const input = getByTestId("chatbot-input");
    fireEvent.change(input, { target: { value: "What's up?" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    await waitFor(() => expect(getByText("Test bot response")).toBeInTheDocument());
  });

  it("clears input after sending message", async () => {
    const { getByTestId } = render(
      <ChatbotWindow onClose={() => { }} isOpen={true} chatButtonRef={React.createRef()} />
    );
    const input = getByTestId("chatbot-input");
    fireEvent.change(input, { target: { value: "Clear me" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    await waitFor(() => expect(input).toHaveValue(""));
  });

  // Test: shows error state when API fails
  // This test simulates an API failure and expects the user-facing error message to be rendered
  it("shows error state when API fails", async () => {
    // Dynamically mock sendChatbotMessage to throw only for this test
    const { sendChatbotMessage } = require("../lib/chatbot");
    sendChatbotMessage.mockImplementationOnce(() => Promise.reject(new Error("API error")));

    const { getByTestId, findByText } = render(
      <ChatbotWindow onClose={() => { }} isOpen={true} chatButtonRef={React.createRef()} />
    );
    const input = getByTestId("chatbot-input");
    fireEvent.change(input, { target: { value: "fail" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    // Match the actual error message shown to the user
    expect(
      await findByText("Failed to connect to chatbot. Please try again.")
    ).toBeInTheDocument();
  });
});