// src/components/__tests__/App.integration.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";

// Mock server setup using MSW (Mock Service Worker)
const server = setupServer(
  rest.get("http://localhost:3001/investigations", (req, res, ctx) => {
    const source = req.url.searchParams.get("source");
    const severity = req.url.searchParams.get("severity");

    let data = [
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

    if (source) {
      data = data.filter((inv) => inv.source === source);
    }

    if (severity) {
      data = data.filter((inv) => inv.severity === severity);
    }

    return res(ctx.status(200), ctx.json(data));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App Integration Tests", () => {
  it("applies filters and updates the table", async () => {
    render(<App />);

    // Wait for initial data to load
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    );

    // Verify initial data is rendered
    expect(screen.getByText("Investigation 1")).toBeInTheDocument();
    expect(screen.getByText("Investigation 2")).toBeInTheDocument();

    // Apply a filter for Source: AWS
    const sourceSelect = screen.getByLabelText(/source/i);
    fireEvent.change(sourceSelect, { target: { value: "AWS" } });

    const applyButton = screen.getByRole("button", { name: /apply filters/i });
    fireEvent.click(applyButton);

    // Wait for data to update
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    );

    // Verify filtered data
    expect(screen.getByText("Investigation 1")).toBeInTheDocument();
    expect(screen.queryByText("Investigation 2")).not.toBeInTheDocument();
  });
});
