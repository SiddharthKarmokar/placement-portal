import React from "react";
import StudentUpdates from "./StudentUpdates";
import Sidebar from "../components/SideNav";

const StudentManagement = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex items-center justify-center mt-5 w-[95%] mx-auto rounded-full">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="Institute Logo" className="h-10 w-10" />
            <h1 className="text-xl font-semibold">
              Training & Placement Cell, IIITDM Kurnool
            </h1>
          </div>
        </header>

        <main className="flex-1 p-6">
          <StudentUpdates />
        </main>
      </div>
    </div>
  );
};

export default StudentManagement;
