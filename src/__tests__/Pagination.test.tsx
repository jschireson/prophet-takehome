// src/components/__tests__/Pagination.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/molecules/Pagination";

describe("Pagination Component", () => {
  const mockSetPage = jest.fn();

  it("renders pagination controls", () => {
    render(
      <Pagination
        page={2}
        setPage={mockSetPage}
        totalItems={50}
        itemsPerPage={10}
      />,
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        page={1}
        setPage={mockSetPage}
        totalItems={50}
        itemsPerPage={10}
      />,
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        page={5}
        setPage={mockSetPage}
        totalItems={50}
        itemsPerPage={10}
      />,
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("calls setPage with previous page number when Previous is clicked", () => {
    render(
      <Pagination
        page={3}
        setPage={mockSetPage}
        totalItems={50}
        itemsPerPage={10}
      />,
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });

  it("calls setPage with next page number when Next is clicked", () => {
    render(
      <Pagination
        page={3}
        setPage={mockSetPage}
        totalItems={50}
        itemsPerPage={10}
      />,
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockSetPage).toHaveBeenCalledWith(4);
  });
});
