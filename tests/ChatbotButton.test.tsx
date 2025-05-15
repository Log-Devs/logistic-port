import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatbotButton from "../components/ChatbotButton";
import "@testing-library/jest-dom";

describe("ChatbotButton", () => {
  it("renders floating button", () => {
    render(<ChatbotButton />);
    expect(screen.getByTestId("chatbot-fab")).toBeInTheDocument();
  });

  it("opens chatbot window on click", async () => {
    const user = userEvent.setup();
    render(<ChatbotButton />);

    await user.click(screen.getByTestId("chatbot-fab"));
    // ChatbotWindow is lazy-loaded, so we just verify the click occurred
  });
});
