import React from "react";
import { NavLink } from "react-router-dom";

const MechanicSidebar = () => {
  return (
    <div className="bg-gray-800 p-6 h-full">
      <h2 className="text-white text-2xl font-bold mb-4">Mechanic Panel</h2>
      <ul className="space-y-4">
        <li>
          <NavLink to="/mechanics-dashboard" className="text-blue-400 hover:text-white">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/assigned-tasks" className="text-blue-400 hover:text-white">
            Assigned Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/mechanic-notifications" className="text-blue-400 hover:text-white">
            Notifications
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MechanicSidebar;