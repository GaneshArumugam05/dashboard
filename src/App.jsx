import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardHome from "./Pages/DashboardHome";
import EditProfile from "./components/EditProfile";

import { ThemeProvider } from "./context/ThemeContext";

import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgetPassword";
import NotificationPage from "./components/Notification";

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard Home */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar />
                  <div className="flex flex-col flex-1">
                    <Navbar />
                    <main className="flex-1 overflow-auto">
                      <DashboardHome />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          {/* Profile Page */}
          <Route
            path="/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar />
                  <div className="flex flex-col flex-1">
                    <Navbar />
                    <main className="flex-1 overflow-auto p-4">
                      <EditProfile />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          {/* NOTIFICATION SCREEN (New) */}
          <Route
            path="/notifications"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar />
                  <div className="flex flex-col flex-1">
                    <Navbar />
                    <main className="flex-1 overflow-auto p-4">
                      <NotificationPage />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          {/* Redirect all unmatched routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
