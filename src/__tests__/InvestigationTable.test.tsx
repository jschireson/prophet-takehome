// src/components/__tests__/InvestigationTable.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Investigation } from "../types/Investigation";
import InvestigationTable from "../components/organisms/InvestigationTable";

const mockData: Investigation[] = [
  {
    id: "1",
    title: "Investigation 1",
    source: "AWS",
    severity: "High",
    determination: "True positive",
    alertFiredTimestamp: "2023-10-01T12:00:00Z",
    lastUpdatedTimestamp: "2023-10-02T12:00:00Z",
    analystAssigned: "John Doe",
    readyForReview: "Yes",
  },
  {
    id: "2",
    title: "Investigation 2",
    source: "Azure",
    severity: "Medium",
    determination: "False positive",
    alertFiredTimestamp: "2023-10-03T12:00:00Z",
    lastUpdatedTimestamp: "2023-10-04T12:00:00Z",
    analystAssigned: "Jane Smith",
    readyForReview: "No",
  },
];

describe("InvestigationTable Component", () => {
  it("renders loading state", () => {
    render(
      <InvestigationTable
        data={[]}
        isLoading={true}
        error={null}
        sortColumn="title"
        sortDirection="asc"
        handleSort={() => {}}
      />,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <InvestigationTable
        data={[]}
        isLoading={false}
        error="Error fetching data"
        sortColumn="title"
        sortDirection="asc"
        handleSort={() => {}}
      />,
    );
    expect(
      screen.getByText(/error loading investigations/i),
    ).toBeInTheDocument();
  });

  it("renders no results state", () => {
    render(
      <InvestigationTable
        data={[]}
        isLoading={false}
        error={null}
        sortColumn="title"
        sortDirection="asc"
        handleSort={() => {}}
      />,
    );
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it("renders table with data", () => {
    render(
      <InvestigationTable
        data={mockData}
        isLoading={false}
        error={null}
        sortColumn="title"
        sortDirection="asc"
        handleSort={() => {}}
      />,
    );
    expect(screen.getByText("Investigation 1")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("True positive")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("YES")).toBeInTheDocument();

    expect(screen.getByText("Investigation 2")).toBeInTheDocument();
    expect(screen.getByText("Azure")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("False positive")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("NO")).toBeInTheDocument();
  });

  it("calls handleSort when column header is clicked", () => {
    const mockHandleSort = jest.fn();
    render(
      <InvestigationTable
        data={mockData}
        isLoading={false}
        error={null}
        sortColumn="title"
        sortDirection="asc"
        handleSort={mockHandleSort}
      />,
    );
    const titleHeader = screen.getByText("Title");
    fireEvent.click(titleHeader);
    expect(mockHandleSort).toHaveBeenCalledWith("title");
  });
});
