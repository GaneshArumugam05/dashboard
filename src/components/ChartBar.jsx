import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BAR_COLORS = ["#4f46e5", "#10b981"]; // Indigo, Green

function ChartBar({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-black dark:text-white">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <XAxis dataKey="month" stroke="currentColor" tickLine={false} axisLine tick={{ fill: "currentColor", fontSize: 12, fontWeight: 500 }} />
          <YAxis stroke="currentColor" tickLine={false} axisLine tick={{ fill: "currentColor", fontSize: 12, fontWeight: 500 }} />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
          <Legend wrapperStyle={{ color: "currentColor" }} />
          <Bar dataKey="sales" fill={BAR_COLORS[0]} />
          <Bar dataKey="users" fill={BAR_COLORS[1]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartBar;
