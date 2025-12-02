import React, { useState, useMemo } from "react";

function DataTable({ rows }) {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trendFilter, setTrendFilter] = useState("all");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border border-green-200 dark:border-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border border-red-200 dark:border-red-700";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-700";
    }
  };

  const getTrendColor = (trend) => {
    if (trend.includes("↑"))
      return "text-green-600 dark:text-green-400 font-semibold";
    if (trend.includes("↓"))
      return "text-red-600 dark:text-red-400 font-semibold";
    return "text-gray-600 dark:text-gray-400 font-medium";
  };

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((row) =>
        statusFilter === "all"
          ? true
          : row.status.toLowerCase() === statusFilter
      )
      .filter((row) => {
        if (trendFilter === "all") return true;
        if (trendFilter === "up") return row.trend.includes("↑");
        if (trendFilter === "down") return row.trend.includes("↓");
        if (trendFilter === "neutral")
          return !row.trend.includes("↑") && !row.trend.includes("↓");
        return true;
      });
  }, [rows, searchTerm, statusFilter, trendFilter]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6">
      {/* SEARCH + FILTERS */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name..."
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          value={trendFilter}
          onChange={(e) => {
            setTrendFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Trends</option>
          <option value="up">↑ Up</option>
          <option value="down">↓ Down</option>
          <option value="neutral">→ Neutral</option>
        </select>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard Overview
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing {currentRows.length} of {filteredRows.length} filtered items
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 border-b border-gray-200 dark:border-gray-600">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Value
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Revenue
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                Trend
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {row.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {row.value}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {row.revenue}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={getTrendColor(row.trend)}>{row.trend}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-600 dark:text-gray-300"
                >
                  No matching results found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
            >
              ›
            </button>
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            5 rows per page
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
