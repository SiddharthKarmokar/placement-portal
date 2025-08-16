import { useState, useEffect, React } from "react";
import ProfileCard from "./ProfileCard";
import LogoNav from "../components/LogoNav";
import { Link } from "react-router-dom";

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
    <>
    <div className="flex justify-center items-center p-2">
    <LogoNav/>
    </div>

      <div className="relative min-h-screen bg-gray-100">
        <div className="relative h-96 bg-[#56318A] flex items-center justify-center text-white">
          <div className="text-center p-6 bg-black/30 rounded-lg backdrop-blur-md">
            <h1 className="text-4xl md:text-5xl font-bold">Welcome, Admin</h1>
            <p className="mt-2 text-lg md:text-xl">
              Manage your dashboard efficiently.
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#56318A] to-[#029309] opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <ProfileCard
                profName="Admin"
                className="bg-white  rounded-lg shadow-xl p-6 transition-transform hover:scale-105"
              />
            </div>

            <div className="col-span-1">
              <div className="bg-white  rounded-lg shadow-xl p-6 h-full flex flex-col justify-between transition-transform hover:scale-105">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 ">
                    Job Postings
                  </h2>
                  <p className="mt-2 text-gray-600 ">
                    View, create, and manage all job listings.
                  </p>
                </div>
                <Link to="/admin/jobs" className="mt-4">
                  <button className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Go to Job Postings
                  </button>
                </Link>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white  rounded-lg shadow-xl p-6 h-full flex flex-col justify-between transition-transform hover:scale-105">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Student Management
                  </h2>
                  <p className="mt-2 text-gray-600 ">
                    Manage user accounts and permissions.
                  </p>
                </div>

                <button
                  disabled
                  className="w-full py-3 px-6 bg-gray-400 text-white font-semibold rounded-lg"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHome;
