import React, { useState } from "react";
import {
  Home,
  FileText,
  Settings,
  Bell,
  Info,
  Users,
  Upload,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const role = localStorage.getItem("rol"); // ✅ safer

  // Menu config based on role
  const menuItems =
    role === "admin"
      ? [
          { icon: Home, label: "Dashboard", dest: "/", external: false },
          { icon: Users, label: "Student Management", dest: "/students", external: false },
          { icon: Upload, label: "Upload CSV", dest: "/upload-csv", external: false },
          { icon: FileText, label: "Placement Site", dest: "/placement", external: false },
          { icon: ExternalLink, label: "Institute site + Site", dest: "https://iiitk.ac.in/", external: true },
        ]
      : [
          { icon: Home, label: "Dashboard", dest: "/", external: false },
          { icon: FileText, label: "Profile", dest: `/student/profile/${JSON.parse(localStorage.getItem("user")).roll_number}`, external: false },
          { icon: ExternalLink, label: "Institute Site", dest: "https://iiitk.ac.in/", external: true },
          { icon: FileText, label: "Placement Stats", dest: "/https://iiitk.ac.in/Placement-Statistics/page", external: true },
        ];

  return (
    <motion.div
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="h-[90vh] mt-[5vh] relative top-0 left-0 rounded-3xl p-4 bg-white shadow-2xl flex flex-col justify-between "
    >
      {/* Logo + Toggle */}
      <div>
        <div className="flex items-center gap-3 relative">
          <img src="/logo.webp" alt="logo" className="w-12" />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-semibold text-gray-800"
            >
              Placement Cell
            </motion.span>
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
          {menuItems.map(({ icon: Icon, label, dest, external }, idx) =>
            external ? (
              <a
                key={idx}
                href={dest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer"
              >
                <Icon size={22} className="text-gray-700" />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-700 font-medium"
                  >
                    {label}
                  </motion.span>
                )}
              </a>
            ) : (
              <Link
                to={dest}
                key={idx}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 cursor-pointer"
              >
                <Icon size={22} className="text-gray-700" />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-700 font-medium"
                  >
                    {label}
                  </motion.span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="border-t pt-4 flex items-center gap-3">
        <img
          src="/profile.png"
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`${isOpen ? "flex flex-col" : "hidden"}`}
        >
          <span className="text-sm text-gray-500">Welcome back</span>
          <span className="font-medium text-gray-800">Captain</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
