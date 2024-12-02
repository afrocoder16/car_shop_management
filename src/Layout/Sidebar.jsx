import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Highlight the active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-1/5 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Navigation</h2>
      <ul className="space-y-4">
        {/* User Dashboard Links */}
        <li>
          <Link
            to="/"
            className={`block p-2 rounded ${isActive("/") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            User Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/bookings"
            className={`block p-2 rounded ${isActive("/bookings") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Bookings
          </Link>
        </li>
        <li>
          <Link
            to="/billing"
            className={`block p-2 rounded ${isActive("/billing") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Billing
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`block p-2 rounded ${isActive("/profile") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Profile
          </Link>
        </li>

        {/* Owner Dashboard Links */}
        <li>
          <Link
            to="/owner-dashboard"
            className={`block p-2 rounded ${isActive("/owner-dashboard") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Owner Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/manage-cars"
            className={`block p-2 rounded ${isActive("/manage-cars") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Manage Cars
          </Link>
        </li>

        {/* Mechanic Dashboard Links */}
        <li>
          <Link
            to="/mechanics-dashboard"
            className={`block p-2 rounded ${isActive("/mechanics-dashboard") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Mechanics Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/assigned-tasks"
            className={`block p-2 rounded ${isActive("/assigned-tasks") ? "bg-blue-500" : "hover:bg-gray-700"}`}
          >
            Assigned Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/notifications-employee"
            className={`block p-2 rounded ${
              isActive("/notifications-employee") ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
          >
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;