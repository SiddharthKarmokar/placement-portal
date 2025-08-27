import React, { useState } from "react";
import { Eye } from "lucide-react";

const GetStudentUpdates = () => {
  // Example data (you can fetch from API later)
  const students = [
    {
      name: "John",
      roll: "961321104000",
      year: "III",
      semester: "06",
      batch: "2020-2024",
    },
    {
      name: "Arjun Kumar",
      roll: "961321104001",
      year: "III",
      semester: "06",
      batch: "2020-2024",
    },
    {
      name: "Rahul Verma",
      roll: "961321104002",
      year: "III",
      semester: "06",
      batch: "2020-2024",
    },
    {
      name: "Sneha",
      roll: "961321104003",
      year: "III",
      semester: "06",
      batch: "2020-2024",
    },
  ];

  const [page, setPage] = useState(1);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>

      <div className="space-y-4">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-4 flex justify-between items-center"
          >
            {/* Left Side */}
            <div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <div className="text-sm text-gray-600">
                Roll Number: <span className="font-medium">{student.roll}</span>
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  Year: {student.year}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  Sem: {student.semester}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  Batch: {student.batch}
                </span>
              </div>
            </div>

            {/* View button */}
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
              <Eye size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer with pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>Total Students: {students.length}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            className="px-2 py-1 border rounded"
          >
            {"<"}
          </button>
          <span>Page {page} of 2</span>
          <button
            onClick={() => setPage(Math.min(page + 1, 2))}
            className="px-2 py-1 border rounded"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStudentUpdates;
