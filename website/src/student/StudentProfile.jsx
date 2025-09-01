import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import LogoNav from "../components/LogoNav";
import Sidebar from "./SideNav";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      toast.error("Failed to load profile from storage.");
      console.error("Profile parse error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
      {/* Sidebar hidden on small screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Toaster position="top-right" />
        <LogoNav />

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Personal & Professional Info */}
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

          {/* Right - Profile Picture & Location */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center w-full">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-200 mb-3 shadow-md"
              />
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-500 capitalize">{profile.gender}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4 w-full">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={18} /> Location
              </h2>
              <p className="mt-2 font-medium">IIIT KURNOOL</p>
            </div>
          </div>
        </div>
      </div>
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
