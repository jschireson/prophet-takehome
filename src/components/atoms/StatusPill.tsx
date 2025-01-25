import React from "react";

interface StatusPillProps {
  status: "YES" | "NO";
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const isYes = status === "YES";
  const dotColor = isYes ? "bg-green-500" : "bg-red-500";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700`}
    >
      {/* Colored Dot */}
      <span
        className={`inline-block w-2 h-2 mr-2 rounded-full ${dotColor}`}
      ></span>
      {/* Status Text */}
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {status}
      </span>
    </span>
  );
};

export default StatusPill;
