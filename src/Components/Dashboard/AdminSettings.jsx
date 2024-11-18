import React from "react";
import { MdHome, MdSettings, MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white">
        <h1 className="text-center text-xl font-bold py-6">Admin Panel</h1>
        <nav className="mt-10">
          <ul>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/dashboard" className="flex items-center">
                <MdDashboard className="text-2xl mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/home" className="flex items-center">
                <MdHome className="text-2xl mr-2" />
                Home
              </Link>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <Link to="/admin/settings" className="flex items-center">
                <MdSettings className="text-2xl mr-2" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-10">
        <h2 className="text-3xl font-bold">Welcome to Admin Dashboard</h2>
        <p className="mt-4 text-gray-600">
          Aquí puedes administrar las configuraciones principales.
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
