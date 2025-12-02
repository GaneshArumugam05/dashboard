import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LINE_COLOR = "#4f46e5"; // Indigo

function ChartLine({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-black dark:text-white">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <XAxis dataKey="day" stroke="currentColor" tickLine={false} axisLine tick={{ fill: "currentColor", fontSize: 12, fontWeight: 500 }} />
          <YAxis stroke="currentColor" tickLine={false} axisLine tick={{ fill: "currentColor", fontSize: 12, fontWeight: 500 }} />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="revenue" stroke={LINE_COLOR} strokeWidth={2} dot={{ fill: LINE_COLOR }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartLine;
