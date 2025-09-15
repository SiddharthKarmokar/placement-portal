import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  Upload,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleNavigation = () => {
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <motion.div
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-[90vh] mt-[5vh] relative top-0 left-0 rounded-3xl p-4 bg-white shadow-2xl flex flex-col justify-between"
    >
      {/* Logo + Toggle */}
      <div>
        <div className="flex items-center gap-3 relative">
          <img src="/logo.webp" alt="logo" className="w-12" />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
      <div>
        <button
          onClick={handleNavigation}
          className="flex w-[80%] items-center mx-auto mb-7 justify-center gap-2 bg-red-700 hover:bg-red-500 active:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
        <div className="border-t pt-4 flex items-center gap-3">
          {/* Profile image always visible */}
          <img
            src="/profile.png"
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />

          {/* Text fades out on collapse */}
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
      </div>
    </motion.div>
  );
};

export default Sidebar;
