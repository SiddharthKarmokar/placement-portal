import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiHash, FiPhone, FiSave } from "react-icons/fi";
import { API_URL } from "../../env-config";

const StudentUpdates = ({ student, onClose, onStudentFound }) => {
  // const SERVER_URI = "https://placement-portal-registry-latest.onrender.com";
  const SERVER_URI = API_URL;

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    gender: "other",
    email: "",
    date_of_birth: "",
    phone_no: "",
    username: "",
    roll_number: "",
    branch: "",
    course: "",
    batch: "",
    ssc_cgpa: 0,
    hsc_cgpa: 0,
    btech_cgpa: 0,
    mtech_cgpa: 0,
    backlogs: 0,
    current_address: "",
    permanent_address: "",
    linkedin_link: "",
    github_link: "",
    resume_link: "",
    role: "student",
    career_path: "",
    has_edited_profile: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const branches = ["cse", "ece", "aids", "mech"];
  const courses = ["BTech", "DualDegree", "MTech", "PhD"];
  const genders = ["male", "female", "other"];
  const careerPaths = ["Higher Studies", "Job", "Entrepreneurship"];

  // ✅ Pre-fill data when popup opens
  useEffect(() => {
    if (student) {
      setFormData({
        _id: student._id || "",
        name: student.name || "",
        gender: student.gender || "other",
        email: student.email || "",
        date_of_birth: student.date_of_birth
          ? student.date_of_birth.split("T")[0]
          : "",
        phone_no: student.phone_no || "",
        username: student.username || "",
        roll_number: student.roll_number || "",
        branch: student.branch || "",
        course: student.course || "",
        batch: student.batch || "",
        ssc_cgpa: student.ssc_cgpa || 0,
        hsc_cgpa: student.hsc_cgpa || 0,
        btech_cgpa: student.btech_cgpa || 0,
        mtech_cgpa: student.mtech_cgpa || 0,
        backlogs: student.backlogs || 0,
        current_address: student.current_address || "",
        permanent_address: student.permanent_address || "",
        linkedin_link: student.linkedin_link || "",
        github_link: student.github_link || "",
        resume_link: student.resume_link || "",
        role: student.role || "student",
        career_path: student.career_path || "",
        // has_edited_profile: student.has_edited_profile || false,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCareerPathChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let newPath = prev.career_path ? prev.career_path.split(",") : [];
      if (checked) newPath.push(value);
      else newPath = newPath.filter((p) => p !== value);
      return { ...prev, career_path: newPath.join(",") };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData._id) {
        // console.log(formData._id);
        await axios.put(
          `${SERVER_URI}/profile/admin/student_update/${formData.roll_number}`,
          {
            ...formData,
            detail: [
              {
                loc: ["string", 0],
                msg: "string",
                type: "string",
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Student updated successfully!");
      }

      // else {
      //   await axios.post(`${SERVER_URI}/profile/admin/student_update`, formData, {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   toast.success("Student created successfully!");
      // }
      onStudentFound();
      onClose();
    } catch (error) {
      // console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to save student profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md space-y-8"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FiUser className="text-indigo-600" />
            Student Profile Form
          </h2>

          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                >
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* Academic Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Roll Number", name: "roll_number" },
                {
                  label: "Branch",
                  name: "branch",
                  type: "select",
                  options: branches,
                },
                {
                  label: "Course",
                  name: "course",
                  type: "select",
                  options: courses,
                },
                { label: "Batch Year", name: "batch", type: "number" },
                { label: "SSC CGPA", name: "ssc_cgpa", type: "number" },
                { label: "HSC CGPA", name: "hsc_cgpa", type: "number" },
                { label: "B.Tech CGPA", name: "btech_cgpa", type: "number" },
                { label: "M.Tech CGPA", name: "mtech_cgpa", type: "number" },
                { label: "Backlogs", name: "backlogs", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <section>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <textarea
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                placeholder="Current Address"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
              <textarea
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                placeholder="Permanent Address"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="url"
                name="linkedin_link"
                value={formData.linkedin_link}
                onChange={handleChange}
                placeholder="LinkedIn Profile Link"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="url"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                placeholder="GitHub Profile Link"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="url"
                name="resume_link"
                value={formData.resume_link}
                onChange={handleChange}
                placeholder="Resume Link"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>
          </section>

          {/* Career Path */}
          <section>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Career Path
            </h3>
            <div className="flex flex-wrap gap-4">
              {careerPaths.map((path) => (
                <label key={path} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={path}
                    checked={formData.career_path?.split(",").includes(path)}
                    onChange={handleCareerPathChange}
                  />
                  {path}
                </label>
              ))}
            </div>
          </section>

          {/* Has Edited Profile */}
          <section>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="has_edited_profile"
                checked={formData.has_edited_profile}
                onChange={handleChange}
              />
              Has Edited Profile
            </label>
          </section>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              <FiSave size={18} />
              {isLoading ? "Saving..." : "Save Student Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentUpdates;
