import React, { useState } from "react";
import {
  Home,
  FileText,
  Settings,
  Bell,
  Info,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-[90vh] mt-[5vh] ${
        isOpen ? "w-64" : "w-20"
      } relative top-0 left-0 rounded-3xl p-4 bg-white shadow-2xl flex flex-col justify-between transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div>
        <div className="flex items-center gap-3 relative">
          <img src="/logo.webp" alt="logo" className="w-12" />
          {isOpen && (
            <span className="text-lg font-semibold text-gray-800">
              Placement Cell
            </span>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-1 hover:bg-purple-100 transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 mt-8">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
            <Home size={22} className="text-gray-700" />
            {isOpen && <span className="text-gray-700 font-medium">Dashboard</span>}
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
            <FileText size={22} className="text-gray-700" />
            {isOpen && <span className="text-gray-700 font-medium">Students</span>}
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
            <Settings size={22} className="text-gray-700" />
            {isOpen && <span className="text-gray-700 font-medium">Home Page Control</span>}
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
            <Bell size={22} className="text-gray-700" />
            {isOpen && <span className="text-gray-700 font-medium">Notifications</span>}
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
            <Info size={22} className="text-gray-700" />
            {isOpen && <span className="text-gray-700 font-medium">Info</span>}
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
            <Users size={22} className="text-gray-700" />
            {isOpen && <span className="text-gray-700 font-medium">Users</span>}
          </div>
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="border-t pt-4 flex items-center gap-3">
        <img
          src="/profile.png"
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Welcome back</span>
            <span className="font-medium text-gray-800">Captain</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;