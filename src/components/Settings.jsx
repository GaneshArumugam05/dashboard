import React, { useState } from "react";
import { FaUser, FaBell, FaShieldAlt, FaPalette } from "react-icons/fa";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Ganesh Arumugam",
    email: "ganesh@example.com",
    phone: "+91 9876543210",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [theme, setTheme] = useState("light");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Settings
      </h1>

      {/* Profile Settings */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <FaUser className="text-blue-500" size={22} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Profile Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save Changes
        </button>
      </section>

      {/* Notification Settings */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <FaBell className="text-green-500" size={22} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Notification Settings
          </h2>
        </div>

        <div className="space-y-4">
          {["email", "sms", "push"].map((type) => (
            <div key={type} className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 capitalize">
                {type} Notifications
              </span>

              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[type]}
                  className="sr-only"
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      [type]: !notifications[type],
                    })
                  }
                />
                <div
                  className={`w-11 h-6 rounded-full transition ${
                    notifications[type] ? "bg-blue-600" : "bg-gray-400"
                  } flex items-center`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                      notifications[type] ? "translate-x-5" : "translate-x-1"
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Theme Settings */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <FaPalette className="text-purple-500" size={22} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Appearance (Theme)
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {["light", "dark"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-2 rounded-lg border ${
                theme === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)} Mode
            </button>
          ))}
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <FaShieldAlt className="text-red-500" size={22} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Security Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Old Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
          Update Password
        </button>
      </section>
    </div>
  );
};

export default Settings;
