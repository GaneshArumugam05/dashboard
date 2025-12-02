import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaUserEdit,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  // FAKE GLOBAL DATA (This is where real data comes from API normally)
  const globalData = [
    { label: "Products", type: "E-commerce", path: "/products" },
    { label: "Orders", type: "E-commerce", path: "/orders" },
    { label: "Customers", type: "E-commerce", path: "/customers" },

    { label: "Patients", type: "Healthcare", path: "/patients" },
    { label: "Appointments", type: "Healthcare", path: "/appointments" },
    { label: "Doctors", type: "Healthcare", path: "/doctors" },

    { label: "Transactions", type: "Finance", path: "/transactions" },
    { label: "Reports", type: "Finance", path: "/reports" },

    { label: "Employees", type: "HR", path: "/employees" },
    { label: "Attendance", type: "HR", path: "/attendance" },
    { label: "Payroll", type: "HR", path: "/payroll" },

    { label: "Courses", type: "Education", path: "/courses" },
    { label: "Students", type: "Education", path: "/students" },
    { label: "Exams", type: "Education", path: "/exams" },
  ];

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  // GLOBAL SEARCH FILTER
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = globalData.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredResults(results);
  }, [searchQuery]);

  // CLOSE SEARCH WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NAVIGATION
  const handleNavigate = (path) => {
    navigate(path);
    setShowProfileCard(false);
    setShowSearchResults(false);
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 bg-white dark:text-white relative">
      {/* GLOBAL SEARCH BAR */}
      <div className="relative flex-1 max-w-md ml-16 sm:ml-4" ref={searchRef}>
        <form className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
          <FaSearch className="mr-2 text-gray-500 dark:text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            className="bg-transparent outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search anything…"
            type="text"
          />
        </form>

        {/* SEARCH SUGGESTIONS BOX */}
        {showSearchResults && filteredResults.length > 0 && (
          <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-300 dark:border-gray-700 z-50 max-h-72 overflow-y-auto animate-fadeIn">
            {filteredResults.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex flex-col transition"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* NAV ICONS */}
      <div className="flex items-center gap-6 ml-4 relative">
        {/* DARK MODE TOGGLE */}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <MdLightMode size={26} className="text-yellow-400" />
          ) : (
            <MdDarkMode size={26} className="text-gray-800" />
          )}
        </button>

        {/* NOTIFICATIONS */}
        <button onClick={() => navigate("/notifications")} className="relative">
          <FaBell size={22} className="text-gray-600 dark:text-gray-300" />

          {/* BADGE */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            7
          </span>
        </button>

        {/* PROFILE ICON + NAME + EMAIL + DROPDOWN ARROW */}
        <button
          onClick={() => setShowProfileCard(!showProfileCard)}
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FaUserCircle
            size={34}
            className="text-gray-700 dark:text-gray-200"
          />

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {user.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
          </div>

          {/* Dropdown Arrow */}
          <svg
            className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform ${
              showProfileCard ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* PROFILE DROPDOWN */}
        {showProfileCard && (
          <div className="absolute right-0 top-14 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 p-5 z-50">
            {/* MENU */}
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded w-full"
                >
                  <FaUserEdit className="text-blue-500" />
                  Edit Profile
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigate("/settings")}
                  className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded w-full"
                >
                  <FaCog className="text-green-500" />
                  Settings
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigate("/support")}
                  className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded w-full"
                >
                  <FaQuestionCircle className="text-yellow-500" />
                  Support
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavigate("/signin")}
                  className="flex items-center gap-3 hover:bg-red-100 dark:hover:bg-red-800 p-2 rounded w-full text-red-600 dark:text-red-400"
                >
                  <FaSignOutAlt />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
