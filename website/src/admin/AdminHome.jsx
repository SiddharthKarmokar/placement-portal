import { useState, useEffect, React } from "react";
import Sidebar from "../components/SideNav";
import LogoNav from "../components/LogoNav";
import JobPost from "./JobPost";

const AdminHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen flex bg-[#EEEEEE]">
      {/* Sidebar - collapses on small screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <LogoNav className="shadow-md sticky top-0 z-10" />
        <div className="flex flex-1 flex-col lg:flex-row gap-6 p-4 md:p-6 overflow-y-auto">
          {/* Job Post Section */}
          <div className="flex-1 rounded-3xl md:overflow-y-auto">
            <JobPost />
          </div>

          {/* Right Side Actions */}
          <div className="w-full lg:w-[280px] hidden flex-col lg:flex gap-4">
            {/* Update Brochure */}
            <div className="bg-red-400 rounded-2xl p-6 shadow-md cursor-pointer flex items-center justify-center text-center">
              <h2 className="text-white font-semibold text-lg">Update Brochure</h2>
            </div>

            {/* Home Page Control */}
            <div className="bg-white rounded-2xl p-6 shadow-md cursor-pointer flex items-center justify-center text-center">
              <h2 className="text-black font-semibold">Home Page Control</h2>
            </div>

            {/* CSV Upload */}
            <div className="bg-white rounded-2xl p-6 shadow-md cursor-pointer flex items-center justify-center text-center">
              <h2 className="text-black font-semibold">Upload CSV</h2>
            </div>

            {/* Users */}
            <div className="bg-white rounded-2xl p-6 shadow-md cursor-pointer flex items-center justify-center text-center">
              <h2 className="text-black font-semibold">Users</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
