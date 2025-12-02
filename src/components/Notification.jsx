import React from "react";
import { FaBell } from "react-icons/fa";

const notifications = [
  { id: 1, title: "New User Registered", time: "2 min ago", type: "success" },
  { id: 2, title: "Order #1245 Shipped", time: "10 min ago", type: "info" },
  { id: 3, title: "5 Items Low in Stock", time: "30 min ago", type: "warning" },
  {
    id: 4,
    title: "Server Backup Completed",
    time: "1 hr ago",
    type: "success",
  },
  {
    id: 5,
    title: "New Message from Support",
    time: "3 hr ago",
    type: "message",
  },
  {
    id: 6,
    title: "Payment of ₹2500 Received",
    time: "5 hr ago",
    type: "success",
  },
];

const colors = {
  success: "bg-green-100 text-green-700",
  info: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  message: "bg-purple-100 text-purple-700",
};

function NotificationPage() {
  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      {/* PAGE HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <FaBell size={26} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Notifications
        </h1>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border 
              border-gray-200 dark:border-gray-700 flex items-center justify-between"
          >
            {/* LEFT SIDE */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.time}
              </p>
            </div>

            {/* BADGE */}
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                colors[item.type]
              }`}
            >
              {item.type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPage;
