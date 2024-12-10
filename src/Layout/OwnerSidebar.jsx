import React from "react";
import { NavLink } from "react-router-dom";

const OwnerSidebar = () => {
  return (
    <div className="bg-gray-800 p-6 h-full">
      <h2 className="text-white text-2xl font-bold mb-4">Owner Panel</h2>
      <ul className="space-y-4">
        <li>
          <NavLink to="/owner-dashboard" className="text-blue-400 hover:text-white">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/manage-cars" className="text-blue-400 hover:text-white">
            Manage Cars
          </NavLink>
        </li>
        <li>
          <NavLink to="/owner-notifications" className="text-blue-400 hover:text-white">
            Notifications
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default OwnerSidebar;