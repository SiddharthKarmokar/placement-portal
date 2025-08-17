import React from "react";
import JobGet from "./JobGet";
import StudentProfile from "./StudentProfile";
import ChangePassword from "./ChangePassword";
import UploadResume from "./UploadResume";

const StudentHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-center mt-5 w-[95%] mx-auto rounded-full">
        <div className="flex items-center gap-3">
          <img src="/logo.webp" alt="Institute Logo" className="h-10 w-10" />
          <h1 className="text-xl font-semibold">
            Training & Placement Cell, IIITDM Kurnool
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Left Section - Jobs */}
        <div className="flex-1 rounded-2xl overflow-hidden shadow-md ">
          <JobGet className="rounded-2xl" />
        </div>

        {/* Right Section - Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          {/* Profile */}
          <div className="bg-white rounded-2xl shadow-3xl overflow-hidden pb-4 text-center">
            <div className="relative shadow-3xl h-20 bg-[#DED9D9]"></div>
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="w-24 h-24 relative top-[-12] rounded-full mx-auto mb-3"
            />
            <div className="p-4 ">
              <h3 className="text-lg font-semibold">Mika Kunisaki</h3>
              <button className="mt-3 w-full bg-white border-1 font-extrabold border-gray-300  hover:bg-gray-100 active:bg-white rounded-2xl py-2">
                View Profile
              </button>
            </div>
          </div>

          {/* Upload Resume */}
          <div className="bg-white flex flex-wrap rounded-2xl shadow-3xl p-4">
            <img src="/cvUp.png" alt="Upload CV" />
            <button className="mt-3 w-fit px-3 mx-auto font-extrabold bg-white border-1 border-gray-300  hover:bg-gray-100 active:bg-white rounded-2xl py-2">
              Upload Resume
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl flex flex-wrap shadow-3xl p-4">
            <button className="mt-3 px-3 mx-auto font-extrabold bg-white border-1 border-gray-300  hover:bg-gray-100 active:bg-white rounded-2xl py-2">
              <img src="/passChange.png" alt="change password" />
              <span>Change Password</span>
            </button>

            <button className="mt-3 px-3 mx-auto font-extrabold bg-white border-1 border-gray-300  hover:bg-gray-100 active:bg-white rounded-2xl py-2">
              <img src="/logout.png" alt="logout" />
              <span>Logout</span>
            </button>
          </div>

          {/* Logout */}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
