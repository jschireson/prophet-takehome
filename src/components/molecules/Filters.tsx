import React, { useState } from "react";

interface FiltersProps {
  filters: {
    source: string;
    severity: string;
    determination: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const handleClearFilters = () => {
    onFilterChange("source", "");
    onFilterChange("severity", "");
    onFilterChange("determination", "");
    onFilterChange("startDate", "");
    onFilterChange("endDate", "");
  };

  const onApplyFilters = () => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="space-y-4 p-4 dark:bg-gray-900">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Source Filter */}
        <select
          value={filters.source}
          onChange={(e) => onFilterChange("source", e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded transition-colors duration-200"
        >
          <option value="">All Sources</option>
          <option value="AWS">AWS</option>
          <option value="Azure">Azure</option>
          <option value="Crowdstrike">Crowdstrike</option>
          <option value="SentinelOne">SentinelOne</option>
          <option value="Okta">Okta</option>
        </select>

        {/* Severity Filter */}
        <select
          value={filters.severity}
          onChange={(e) => onFilterChange("severity", e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded transition-colors duration-200"
        >
          <option value="">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded transition-colors duration-200"
        >
          {isAdvancedFiltersOpen
            ? "Hide Advanced Filters"
            : "Show Advanced Filters"}
        </button>
      </div>

      {/* Advanced Filters Section */}
      {isAdvancedFiltersOpen && (
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Determination Filter */}
          <select
            value={filters.determination}
            onChange={(e) => onFilterChange("determination", e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded transition-colors duration-200"
          >
            <option value="">All Determinations</option>
            <option value="True positive">True positive</option>
            <option value="False positive">False positive</option>
            <option value="In progress">In progress</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Start Date Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="startDate"
              className="text-gray-700 dark:text-gray-300"
            >
              From:
            </label>
            <input
              id="startDate"
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange("startDate", e.target.value)}
              max={filters.endDate || undefined}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded transition-colors duration-200"
            />
          </div>

          {/* End Date Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="endDate"
              className="text-gray-700 dark:text-gray-300"
            >
              To:
            </label>
            <input
              id="endDate"
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange("endDate", e.target.value)}
              min={filters.startDate || undefined}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded transition-colors duration-200"
            />
          </div>

          {/* Filter Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onApplyFilters}
              className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
