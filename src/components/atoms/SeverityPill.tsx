import React from "react";

interface SeverityPillProps {
  severity: string;
}

const SeverityPill: React.FC<SeverityPillProps> = ({ severity }) => {
  const colorMap: Record<string, string> = {
    Low: "bg-green-200 text-green-800",
    Medium: "bg-yellow-200 text-yellow-800",
    High: "bg-red-200 text-red-800",
    Critical: "bg-red-600 text-white",
  };

  const colorClasses = colorMap[severity] ?? "bg-gray-200 text-gray-800";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClasses}`}
    >
      {severity}
    </span>
  );
};

export default SeverityPill;
