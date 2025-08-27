import React from "react";
import GetStudentUpdates from "./GetStudentUpdates";
import Sidebar from "../components/SideNav";

const StudentManagement = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-center mt-5 w-[95%] mx-auto rounded-full">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="Institute Logo" className="h-10 w-10" />
            <h1 className="text-xl font-semibold">
              Training & Placement Cell, IIITDM Kurnool
            </h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <GetStudentUpdates />
        </main>
      </div>
    </div>
  );
};

export default StudentManagement;
