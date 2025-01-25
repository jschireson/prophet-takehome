import React from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  options?: number[];
  label?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  options = [5, 10, 20, 50],
  label = "Items per page:",
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-800 dark:text-gray-200">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Items Per Page Dropdown */}
      <div className="flex items-center">
        <label
          htmlFor="items-per-page"
          className="mr-2 text-gray-800 dark:text-gray-200"
        >
          {label}
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700"
        >
          {options.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
