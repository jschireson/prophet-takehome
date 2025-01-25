import React from "react";
import ThemeToggle from "../atoms/ThemeToggle";

const Header: React.FC = () => (
  <div className="shrink-0 p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Security Investigations
      </h1>
      <ThemeToggle />
    </div>
  </div>
);

export default Header;
