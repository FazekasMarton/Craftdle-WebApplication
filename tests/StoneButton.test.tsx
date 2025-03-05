import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { StoneButton } from "../src/components/StoneButton";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { SoundEffect } from "../src/classes/Audio";

describe("StoneButton component", () => {
  it("renders a button with children text", () => {
    render(<StoneButton>Click me</StoneButton>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("applies opacity style when disabled", () => {
    render(<StoneButton disabled>Disabled Button</StoneButton>);
    const button = screen.getByText("Disabled Button");
    expect(button).toHaveStyle({ opacity: "0.3" });
  });

  it("renders an anchor tag when href is provided", () => {
    render(
      <BrowserRouter>
        <StoneButton href="https://example.com">Link Button</StoneButton>
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveTextContent("Link Button");
  });

  it("renders a div when href is not provided", () => {
    render(<StoneButton>Div Button</StoneButton>);
    const div = screen.getByText("Div Button").closest("div");
    expect(div).toBeInTheDocument();
  });

  it("should play sound on click", () => {
    const playMock = vi.fn();
  
    vi.stubGlobal("Audio", class {
      play = playMock;
      load = vi.fn();
      volume = 1;
      currentTime = 0;
    });
  
    vi.spyOn(SoundEffect, "play").mockImplementation(() => {
      playMock();
    });
  
    render(<StoneButton>Sound Test</StoneButton>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
  
    expect(playMock).toHaveBeenCalled();
  });
});