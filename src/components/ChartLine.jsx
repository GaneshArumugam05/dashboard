import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const LINE_COLORS = ["#4f46e5", "#10b981", "#f59e0b"]; // Indigo, Green, Yellow

function ChartLine({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-black dark:text-white">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <XAxis 
            dataKey="day"
            stroke="currentColor"
            tickLine={false}
            axisLine={true}
            tick={{ fill: "currentColor", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis 
            stroke="currentColor"
            tickLine={false}
            axisLine={true}
            tick={{ fill: "currentColor", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
          <Legend verticalAlign="top" height={36} />
          
          <Line type="monotone" dataKey="revenue" stroke={LINE_COLORS[0]} strokeWidth={2} dot={{ fill: LINE_COLORS[0] }} />
          <Line type="monotone" dataKey="users" stroke={LINE_COLORS[1]} strokeWidth={2} dot={{ fill: LINE_COLORS[1] }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartLine;
