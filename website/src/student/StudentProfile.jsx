import React, { useEffect, useState } from "react";
import { MapPin, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import LogoNav from "../components/LogoNav";
import Sidebar from "./SideNav";
import { API_URL } from "../../env-config";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("user");

      if (!storedProfile) {
        toast.error("No profile found. Please log in.");
        setLoading(false);
        return;
      }

      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      setFormData(parsedProfile);
    } catch (error) {
      toast.error("Failed to load profile from storage.");
      console.error("Profile parse error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== "" && v !== null)
    );

    const response = await fetch("/profile/student/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, 
        "email": profile.email,
        "roll_number": profile.roll_number,
      },
      body: JSON.stringify(cleanedData),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const updated = await response.json();
    console.log("Update successful:", updated);
    setProfile(updated); // update UI
    setOpen(false); // close modal
  } catch (err) {
    console.error("Update error:", err);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No profile data available</p>
      </div>
    );
  }

  const avatar =
    profile.gender === "female"
      ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
      : "https://cdn-icons-png.flaticon.com/512/6997/6997661.png";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Toaster position="top-right" />
        <LogoNav />

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
              <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoField label="Full Name" value={profile.name} />
                <InfoField label="Email" value={profile.email} />
                <InfoField label="Contact Number" value={profile.phone_no} />
                <InfoField label="Username" value={profile.username} />
              </div>
            </div>

            {/* Professional Info */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
              <h2 className="text-lg font-semibold mb-2">Professional Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoField label="Degree" value={profile.course} />
                <InfoField label="Branch" value={profile.branch} />
                <InfoField label="Batch" value={profile.batch} />
                <InfoField label="Roll Number" value={profile.roll_number} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center w-full relative">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-200 mb-3 shadow-md"
              />
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-500 capitalize">{profile.gender}</p>

              {/* Edit Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute top-3 right-3 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
              >
                <Edit size={18} className="text-blue-600" />
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4 w-full">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={18} /> Location
              </h2>
              <p className="mt-2 font-medium">IIIT KURNOOL</p>
            </div>
          </div>
          {/* Academic Info */}
<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
  <h2 className="text-lg font-semibold mb-2">Academic Info</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <InfoField label="BTech CGPA" value={profile.btech_cgpa} />
    <InfoField label="Backlogs" value={profile.backlogs} />
    <InfoField label="SSC CGPA" value={profile.ssc_cgpa} />
    <InfoField label="HSC CGPA" value={profile.hsc_cgpa} />
  </div>
</div>

{/* Career & Resume */}
<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
  <h2 className="text-lg font-semibold mb-2">Career</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <InfoField label="Career Path" value={profile.career_path} />
    <InfoField
      label="Resume"
      value={
        profile.resume_link ? (
          <a
            href={profile.resume_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Resume
          </a>
        ) : (
          "—"
        )
      }
    />
  </div>
</div>

{/* Social Links */}
<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
  <h2 className="text-lg font-semibold mb-2">Social Links</h2>
  <div className="flex flex-col gap-2">
    <InfoField
      label="GitHub"
      value={
        profile.github_link ? (
          <a
            href={profile.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {profile.github_link}
          </a>
        ) : (
          "—"
        )
      }
    />
    <InfoField
      label="LinkedIn"
      value={
        profile.linkedin_link ? (
          <a
            href={profile.linkedin_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {profile.linkedin_link}
          </a>
        ) : (
          "—"
        )
      }
    />
  </div>
</div>

        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "name",
                "gender",
                "email",
                "date_of_birth",
                "phone_no",
                "username",
                "roll_number",
                "branch",
                "course",
                "batch",
                "ssc_cgpa",
                "hsc_cgpa",
                "btech_cgpa",
                "mtech_cgpa",
                "backlogs",
                "current_address",
                "permanent_address",
                "linkedin_link",
                "github_link",
                "resume_link",
                "career_path",
              ].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-600 capitalize">{field.replace(/_/g, " ")}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 text-sm"
                  />
                </div>
              ))}

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}
