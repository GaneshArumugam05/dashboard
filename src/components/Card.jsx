import React from "react";

function Card({ title, value, icon, trend }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4 min-w-[150px] text-gray-900 dark:text-gray-100">
      <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-2 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </div>
        <div
          className={`text-xs font-semibold ${
            trend > 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      </div>
    </div>
  );
}

export default Card;
