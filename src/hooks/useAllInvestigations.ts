import { useEffect, useState } from "react";
import axios from "axios";
import { Investigation } from "../types/Investigation";
import { useMemo } from "react";

/**
 * Interface defining the shape of filter parameters for fetching investigations.
 */
interface UseAllInvestigationsProps {
  filters: {
    source?: string;
    severity?: string;
    determination?: string;
    id?: string;
    startDate?: string; // 'YYYY-MM-DD'
    endDate?: string;   // 'YYYY-MM-DD'
  };
}

/**
 * Custom hook to fetch and filter security investigations based on provided filters.
 *
 * @param {UseAllInvestigationsProps} params - The parameters containing filter criteria.
 * @returns {Object} An object containing the filtered data, loading state, and any errors.
 */
export function useAllInvestigations({ filters }: UseAllInvestigationsProps) {
  const { source, severity, determination, id, startDate, endDate } = filters;

  // State to store the original list of investigations fetched from the API.
  const [originalData, setOriginalData] = useState<Investigation[]>([]);
  // State to store the filtered list of investigations based on applied filters.
  const [filteredData, setFilteredData] = useState<Investigation[]>([]);
  // State to indicate whether data is currently being loaded.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to capture any errors that occur during data fetching.
  const [error, setError] = useState<unknown>(null);

  /**
   * Processes the start and end dates to ISO string format with appropriate time settings.
   *
   * @param {string} [start] - The start date in 'YYYY-MM-DD' format.
   * @param {string} [end] - The end date in 'YYYY-MM-DD' format.
   * @returns {Object} An object containing the processed start and end dates in ISO format.
   */
  const processDates = (start?: string, end?: string) => {
    let processedStart = start;
    let processedEnd = end;

    if (start) {
      const startDateObj = new Date(start);
      startDateObj.setHours(0, 0, 0, 0); // Set start time to midnight
      processedStart = startDateObj.toISOString();
    }

    if (end) {
      const endDateObj = new Date(end);
      endDateObj.setHours(23, 59, 59, 999); // Set end time to the end of the day
      processedEnd = endDateObj.toISOString();
    }

    return { processedStart, processedEnd };
  };

  /**
   * Effect hook to fetch investigations from the backend API whenever filter parameters change.
   */
  useEffect(() => {
    const fetchInvestigations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let page = 1;
        const pageSize = 100;
        let fetchedAll = false;
        let aggregatedData: Investigation[] = [];

        const { processedStart, processedEnd } = processDates(startDate, endDate);

        // Fetch data in a paginated manner until all data is retrieved.
        while (!fetchedAll) {
          const response = await axios.get("http://localhost:3001/investigations", {
            params: {
              source,
              severity,
              determination,
              id,
              page,
              count: pageSize,
              startDate: processedStart,
              endDate: processedEnd,
            },
          });

          const pageData: Investigation[] = response.data;
          aggregatedData = [...aggregatedData, ...pageData];

          if (pageData.length < pageSize) {
            fetchedAll = true; // No more data to fetch
          } else {
            page += 1; // Move to the next page
          }
        }

        setOriginalData(aggregatedData);
        setFilteredData(aggregatedData); // Initialize filtered data with all fetched data
      } catch (err) {
        setError(err);
        setOriginalData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestigations();
  }, [source, severity, determination, id, startDate, endDate]);

  /**
   * Effect hook to apply filters to the original data whenever filters or original data change.
   */
  useEffect(() => {
    if (originalData.length === 0) {
      setFilteredData([]);
      return;
    }

    let filtered = [...originalData];

    // Apply source filter if specified
    if (source) {
      filtered = filtered.filter((inv) => inv.source === source);
    }
    // Apply severity filter if specified
    if (severity) {
      filtered = filtered.filter((inv) => inv.severity === severity);
    }
    // Apply determination filter if specified
    if (determination) {
      filtered = filtered.filter((inv) => inv.determination === determination);
    }
    // Apply ID filter if specified
    if (id) {
      filtered = filtered.filter((inv) => inv.id === id);
    }
    // Apply date range filter if specified
    if (startDate || endDate) {
      filtered = filtered.filter((inv) => {
        const alertDate = new Date(inv.alertFiredTimestamp);
        let isValid = true;

        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0); // Start of the day
          if (alertDate < start) isValid = false;
        }
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999); // End of the day
          if (alertDate > end) isValid = false;
        }
        return isValid;
      });
    }

    setFilteredData(filtered);
  }, [originalData, filters]);

  return { data: filteredData, isLoading, error };
};

/**
 * Custom hook for managing filter state.
 *
 * @returns {Object} An object containing the current filters and a handler to update them.
 */
export const useFilters = () => {
  // State to hold the current filter values.
  const [filters, setFilters] = useState({
    source: "",
    severity: "",
    determination: "",
    startDate: "",
    endDate: "",
  });

  /**
   * Handler to update a specific filter.
   *
   * @param {string} key - The key of the filter to update.
   * @param {string} value - The new value for the filter.
   */
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, handleFilterChange };
};

/**
 * Custom hook for sorting and paginating data.
 *
 * @param {any[]} data - The data array to sort and paginate.
 * @param {string} [initialSortColumn="title"] - The initial column to sort by.
 * @param {"asc" | "desc"} [initialSortDirection="asc"] - The initial sort direction.
 * @param {number} [initialPageSize=25] - The initial number of items per page.
 * @returns {Object} An object containing sorted and paginated data along with sorting and pagination handlers.
 */
export function usePaginatedSortedData(
  data: any[],
  initialSortColumn: string = "title",
  initialSortDirection: "asc" | "desc" = "asc",
  initialPageSize: number = 25,
) {
  // State for the current sort column.
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  // State for the current sort direction.
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(initialSortDirection);
  // State for the current page number.
  const [page, setPage] = useState(1);
  // State for the number of items per page.
  const [pageSize, setPageSize] = useState(initialPageSize);

  /**
   * Memoized sorted data based on the current sort column and direction.
   */
  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  /**
   * Memoized paginated data based on the current page and page size.
   */
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  /**
   * Handler to change the sort column and toggle sort direction if the same column is selected.
   *
   * @param {string} column - The column to sort by.
   */
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  /**
   * Calculates the total number of pages based on sorted data and page size.
   */
  const totalPages = useMemo(
    () => Math.ceil(sortedData.length / pageSize),
    [sortedData, pageSize],
  );

  /**
   * Handler to update the number of items displayed per page and reset to the first page.
   *
   * @param {number} newPageSize - The new number of items per page.
   */
  const setItemsPerPage = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to the first page when page size changes
  };

  return {
    paginatedData,
    sortedData,
    page,
    setPage,
    pageSize,
    setItemsPerPage,
    totalPages,
    sortColumn,
    sortDirection,
    handleSort,
  };
}

/**
 * Custom hook for managing the selected investigation.
 *
 * @returns {Object} An object containing the selected investigation and a handler to update it.
 */
export function useSelectedInvestigation() {
  // State to hold the currently selected investigation.
  const [selectedInvestigation, setSelectedInvestigation] =
    useState<Investigation | null>(null);

  /**
   * Handler to update the selected investigation.
   *
   * @param {Investigation | null} inv - The investigation to select or null to deselect.
   */
  const handleInvestigationSelect = (inv: Investigation | null) => {
    setSelectedInvestigation(inv);
  };

  return { selectedInvestigation, handleInvestigationSelect };
}
