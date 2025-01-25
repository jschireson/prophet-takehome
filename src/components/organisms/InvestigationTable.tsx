import React from "react";
import { Investigation } from "../../types/Investigation";
import { formatDate } from "../../utils/utils";
import Loader from "../atoms/Loader";
import SeverityPill from "../atoms/SeverityPill";
import StatusPill from "../atoms/StatusPill";

interface Props {
  data: Investigation[];
  isLoading: boolean;
  error: unknown;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  selectedInvestigation: Investigation | null;
  onInvestigationSelect: (inv: Investigation | null) => void;
}

const InvestigationTable: React.FC<Props> = ({
  data,
  isLoading,
  error,
  sortColumn,
  sortDirection,
  handleSort,
  selectedInvestigation,
  onInvestigationSelect,
}) => {
  const panelOpen = Boolean(selectedInvestigation);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader size="large" />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-4 w-full">
        Error loading investigations
      </div>
    );

  if (!data || data.length === 0)
    return <div className="p-4 w-full">No results found</div>;

  const renderSortIndicator = (column: string) =>
    sortColumn === column ? (sortDirection === "asc" ? "▲" : "▼") : "";

  const handleRowClick = (inv: Investigation) => {
    if (selectedInvestigation?.id === inv.id) {
      onInvestigationSelect(null);
    } else {
      onInvestigationSelect(inv);
    }
  };

  return (
    <div className="relative w-full flex px-4">
      <div
        className={`flex-grow overflow-auto transition-all duration-300 ${
          panelOpen ? "mr-[340px]" : ""
        }`}
      >
        <table className="table-auto w-full text-left">
          <thead className="sticky top-0 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-white z-10">
            <tr>
              {[
                { label: "Title", key: "title" },
                { label: "Source", key: "source" },
                { label: "Severity", key: "severity" },
                { label: "Determination", key: "determination" },
                { label: "Alert Fired", key: "alertFiredTimestamp" },
                { label: "Last Updated", key: "lastUpdatedTimestamp" },
                { label: "Analyst", key: "analystAssigned" },
                { label: "Reviewable?", key: "readyForReview" },
              ].map(({ label, key }, index, array) => (
                <th
                  key={key}
                  className={`p-3 cursor-pointer 
                    ${index === 0 ? "rounded-tl-lg" : ""}
                    ${index === array.length - 1 ? "rounded-tr-lg" : ""}
                  `}
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className="w-4 text-center">
                      {renderSortIndicator(key)}
                    </span>
                  </div>
                </th>
              ))}
              <th className="p-3 w-10 rounded-tr-lg" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((inv, index) => {
              const isSelected = selectedInvestigation?.id === inv.id;

              return (
                <tr
                  key={inv.id}
                  onClick={() => handleRowClick(inv)}
                  className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    isSelected
                      ? "bg-blue-100 dark:bg-blue-900 rounded-lg"
                      : index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <td className="p-2 rounded-l-lg">{inv.title}</td>
                  <td className="p-2">{inv.source}</td>
                  <td className="p-2">
                    <SeverityPill severity={inv.severity} />
                  </td>
                  <td className="p-2">{inv.determination}</td>
                  <td className="p-2">{formatDate(inv.alertFiredTimestamp)}</td>
                  <td className="p-2">
                    {formatDate(inv.lastUpdatedTimestamp)}
                  </td>
                  <td className="p-2">{inv.analystAssigned}</td>
                  <td className="p-2 text-center">
                    <StatusPill
                      status={inv.readyForReview === "Yes" ? "YES" : "NO"}
                    />
                  </td>
                  <td className="p-2 text-right rounded-r-lg">
                    <span className="inline-block text-xl">••</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {panelOpen && selectedInvestigation && (
        <div className="absolute top-0 right-4 w-[320px] h-[97%] bg-white dark:bg-gray-800 p-4 overflow-auto transition-all duration-300 z-20 rounded-lg border border-gray-300 dark:border-none">
          <button
            onClick={() => onInvestigationSelect(null)}
            className="mb-4 text-blue-500 hover:underline"
          >
            Close
          </button>
          <h2 className="text-xl font-bold mb-4">Investigation Details</h2>

          <div className="space-y-3">
            <p className="mb-2">
              <strong>Title:</strong> {selectedInvestigation.title}
            </p>
            <p className="mb-2">
              <strong>Source:</strong> {selectedInvestigation.source}
            </p>
            <p className="mb-2">
              <strong>Severity:</strong> {selectedInvestigation.severity}
            </p>
            <p className="mb-2">
              <strong>Determination:</strong>{" "}
              {selectedInvestigation.determination}
            </p>
            <p className="mb-2">
              <strong>Alert Fired:</strong>{" "}
              {formatDate(selectedInvestigation.alertFiredTimestamp)}
            </p>
            <p className="mb-2">
              <strong>Last Updated:</strong>{" "}
              {formatDate(selectedInvestigation.lastUpdatedTimestamp)}
            </p>
            <p className="mb-2">
              <strong>Analyst Assigned:</strong>{" "}
              {selectedInvestigation.analystAssigned}
            </p>
            <p className="mb-2">
              <strong>Reviewable:</strong>{" "}
              {selectedInvestigation.readyForReview}
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-lg">
              <strong className="text-yellow-700 dark:text-yellow-200">
                Prophet LLM Detection
              </strong>
              <p className="mt-2 text-sm">
                Prophet LLM detected {selectedInvestigation.title} from{" "}
                {selectedInvestigation.source} at{" "}
                {formatDate(selectedInvestigation.alertFiredTimestamp)}.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Note: Anomalous network traffic patterns were detected,
                exhibiting characteristics consistent with potential data
                exfiltration attempts. The source IP demonstrated unusual
                communication frequencies and payload sizes that deviate from
                established baseline behaviors, triggering our advanced threat
                detection algorithms.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationTable;
