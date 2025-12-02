import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PIE_COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"]; // Indigo, Green, Yellow, Red, Blue

function ChartPie({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-black dark:text-white">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="source"
            outerRadius={80}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
          <Legend wrapperStyle={{ color: "currentColor" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartPie;
