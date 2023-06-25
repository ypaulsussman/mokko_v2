import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import ConfirmMokkoDelete from "../src/ConfirmMokkoDelete.jsx";

// skip this test for now
describe.skip("The ConfirmMokkoDelete component", () => {
  it("renders the confirmation message", () => {
    render(<ConfirmMokkoDelete />);

    const message = screen.getByText(
      "Are you sure you want to delete this Mokko?"
    );

    expect(message).toBeInTheDocument();
  });

  it("calls the onDelete function when the delete button is clicked", () => {
    const onDelete = jest.fn();
    render(<ConfirmMokkoDelete onDelete={onDelete} />);

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("calls the onCancel function when the cancel button is clicked", () => {
    const onCancel = jest.fn();
    render(<ConfirmMokkoDelete onCancel={onCancel} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
