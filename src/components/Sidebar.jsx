import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaShoppingCart,
  FaBars,
  FaTachometerAlt,
} from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import logo from "../assets/logo.png";

const menu = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
  },
  {
    label: "E-commerce",
    icon: <FaShoppingCart />,
    children: [
      { label: "Products" },
      { label: "Orders" },
      { label: "Customers" },
    ],
  },
  {
    label: "Healthcare",
    icon: <FaUser />,
    children: [
      { label: "Patients" },
      { label: "Appointments" },
      { label: "Doctors" },
    ],
  },
  {
    label: "Finance",
    icon: <FaChartBar />,
    children: [{ label: "Transactions" }, { label: "Reports" }],
  },
  {
    label: "HR Management",
    icon: <FaUser />,
    children: [
      { label: "Employees" },
      { label: "Attendance" },
      { label: "Payroll" },
    ],
  },
  {
    label: "Education",
    icon: <FaChartBar />,
    children: [{ label: "Courses" }, { label: "Students" }, { label: "Exams" }],
  },
];

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openMenus, setOpenMenus] = useState([]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        onClick={toggleCollapse}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-50
          bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isCollapsed ? "-translate-x-full" : "translate-x-0"}
          md:translate-x-0 md:relative`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            Dashboard
          </span>
        </div>

        {/* Menu */}
        <nav className="px-3 pt-3 overflow-y-auto h-[calc(100vh-120px)]">
          {menu.map((item) => {
            const isOpen = openMenus.includes(item.label);

            if (item.path) {
              // Top-level links get margin bottom for spacing
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded-lg font-medium mb-4 ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-200"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } transition`
                  }
                  onClick={() => isCollapsed && setIsCollapsed(true)}
                >
                  <span className="text-indigo-500">{item.icon}</span>
                  {item.label}
                </NavLink>
              );
            }

            return (
              <div key={item.label} className="mb-4">
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="flex items-center justify-between w-full p-2 rounded-lg
                    bg-gray-100 dark:bg-gray-800
                    text-gray-700 dark:text-gray-300 font-medium
                    hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-500">{item.icon}</span>
                    {item.label}
                  </div>
                  {item.children && (
                    <span>
                      {isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div className="ml-10 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        className="text-gray-600 dark:text-gray-400 text-left text-sm py-1 px-2 rounded
                          hover:bg-gray-300 dark:hover:bg-gray-700 
                          hover:text-gray-900 dark:hover:text-white transition"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center gap-2 text-red-600 font-semibold">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={toggleCollapse}
        />
      )}
    </>
  );
}

export default Sidebar;
