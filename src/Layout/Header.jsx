import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Auto Shop
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <button
            className="hover:text-blue-400 transition duration-200"
            onClick={() => navigate("/bookings")}
          >
            Bookings
          </button>
          <button
            className="hover:text-blue-400 transition duration-200"
            onClick={() => navigate("/billing")}
          >
            Billing
          </button>
          <button
            className="hover:text-blue-400 transition duration-200"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="hover:text-blue-400 transition duration-200"
            onClick={() => navigate("/settings")}
          >
            Settings
          </button>
        </nav>

        {/* User Info / Logout */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          onClick={() => {
            // Add logout functionality here
            alert("You have logged out.");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;