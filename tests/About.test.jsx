import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

import About from "../src/About.jsx";

describe("The About page", () => {
  it("renders the h1", () => {
    render(<About />);
    const heading = screen.getByRole("heading", { name: "About Mokko" });

    expect(heading).toBeInTheDocument();
  });

  it("renders the correct number of h2 tags", () => {
    render(<About />);
    const headings = screen.getAllByRole("heading", { level: 2 });

    expect(headings.length).toBe(5);
  });
});
