import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../css/student_login.css";
import { API_URL } from "../../env-config";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tokenRes = await fetch(`${API_URL}/api/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: Username,
          password: Password,
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) {
        toast.error(`❌ ${tokenData.detail || "Login failed"}`);
        setLoading(false);
        return;
      }

      const accessToken = tokenData.access_token;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", "admin");

      const profileRes = await fetch(`${API_URL}/profile/admin/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const profileData = await profileRes.json();
      if (!profileRes.ok) {
        toast.error("⚠️ Login succeeded, but failed to fetch profile.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(profileData));
      toast.success(`✅ Welcome, ${profileData.username || "Admin"}!`);
      navigate(`/admin/${profileData.username}`);
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Toaster position="top-right" />

      {/* Left Section */}
      <div className="right-section flex flex-col w-1/2 justify-evenly items-center bg-[#181204] relative overflow-hidden">
        <div className="z-20">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Welcome to <br />
            <span className="text-7xl font-extrabold">Admin Portal</span>
          </h1>
          <p className="text-gray-300 mt-2 text-sm">
            Login to access your account
          </p>
        </div>
        <img
          className="w-[500px] md:w-[700px] z-30"
          src="/login.png"
          alt="login"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white w-1/2 flex z-100 flex-col justify-start px-12">
        <img
          className="w-[200px] mx-auto mb-40 mt-20"
          src="/logo.webp"
          alt="logo"
        />
        <h2 className="text-3xl mx-auto font-bold mb-8">Login</h2>

        <form
          onSubmit={handleLogin}
          className="flex w-2/3 mx-auto flex-col gap-5"
        >
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-black pb-2"
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b border-gray-300 focus:outline-none focus:border-black pb-2 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-sm text-gray-500 cursor-pointer">
            Forgot Password?
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#181204] text-white py-3 rounded-lg hover:bg-black transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Extra buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              ⬅ Home
            </button>
            <button
              type="button"
              onClick={() => navigate("/student/login")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Student Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
