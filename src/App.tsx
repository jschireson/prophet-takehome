import React, { useState, useMemo } from "react";
import { ThemeProvider } from "./context/ThemeContext";

import {
  useAllInvestigations,
  useFilters,
  usePaginatedSortedData,
  useSelectedInvestigation,
} from "./hooks/useAllInvestigations";
import InvestigationTable from "./components/organisms/InvestigationTable";
import Filters from "./components/molecules/Filters";
import Pagination from "./components/molecules/Pagination";
import { PAGINATION_OPTIONS, SEVERITY_ORDER } from "./constants";
import Header from "./components/molecules/Header";

function App() {
  const { filters, handleFilterChange } = useFilters(); // Manage filters
  const {
    data: investigations,
    isLoading,
    error,
  } = useAllInvestigations({ filters }); // Fetch data based on filters
  const {
    paginatedData,
    sortedData,
    page,
    setPage,
    pageSize,
    setItemsPerPage,
    sortColumn,
    sortDirection,
    handleSort,
  } = usePaginatedSortedData(investigations, "title", "asc", 25);
  const { selectedInvestigation, handleInvestigationSelect } =
    useSelectedInvestigation();

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Fixed Top Section */}
        <Header />
        {/* Filters */}
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        {/* Main Content Area with Flexible Layout */}
        <div className="flex-grow flex overflow-hidden relative">
          <InvestigationTable
            data={paginatedData}
            isLoading={isLoading}
            error={error}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleSort={handleSort}
            selectedInvestigation={selectedInvestigation}
            onInvestigationSelect={handleInvestigationSelect}
          />
        </div>

        {/* Fixed Bottom Pagination */}
        <div className="shrink-0 p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={sortedData.length}
            itemsPerPage={pageSize} // Use pageSize from the hook
            setItemsPerPage={setItemsPerPage} // Use setItemsPerPage from the hook
            options={PAGINATION_OPTIONS}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
