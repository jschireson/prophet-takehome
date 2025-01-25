// src/components/__tests__/Filters.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../components/molecules/Filters";

describe("Filters Component", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnApplyFilters = jest.fn();

  beforeEach(() => {
    render(
      <Filters
        filters={{
          source: "",
          severity: "",
          determination: "",
          startDate: "",
          endDate: "",
        }}
        onFilterChange={mockOnFilterChange}
        onApplyFilters={mockOnApplyFilters}
      />,
    );
  });

  it("renders all filter controls", () => {
    expect(screen.getByLabelText(/source/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/severity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/determination/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/start date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/end date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /apply filters/i }),
    ).toBeInTheDocument();
  });

  it("calls onFilterChange when a filter is changed", () => {
    const sourceSelect = screen.getByLabelText(/source/i);
    fireEvent.change(sourceSelect, { target: { value: "AWS" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({ source: "AWS" });
  });

  it("calls onApplyFilters when Apply Filters button is clicked", () => {
    const applyButton = screen.getByRole("button", { name: /apply filters/i });
    fireEvent.click(applyButton);
    expect(mockOnApplyFilters).toHaveBeenCalled();
  });
});
