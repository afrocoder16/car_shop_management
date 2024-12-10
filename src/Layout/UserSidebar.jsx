import React from "react";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="bg-gray-800 p-6 h-full">
      <h2 className="text-white text-2xl font-bold mb-4">User Panel</h2>
      <ul className="space-y-4">
        <li>
          <NavLink to="/" className="text-blue-400 hover:text-white">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className="text-blue-400 hover:text-white">
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="/billing" className="text-blue-400 hover:text-white">
            Billing
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="text-blue-400 hover:text-white">
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;