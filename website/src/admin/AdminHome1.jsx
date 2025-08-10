import { useState, useEffect, React } from "react";
import ProfileCard from "./ProfileCard";
import JobBoard from "./JobBoard";

import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const AdminHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Navbar
        className={`transition-all duration-300 ${
          isScrolled ? "bg-blue-600 shadow-md" : "bg-black/40 backdrop-blur-md"
        }`}
      />

      <div className="my-20">
        <ProfileCard profName="Admin" />
        <Link to="/admin/jobs">
          <button>Job Postings</button>
        </Link>
      </div>
    </>
  );
};

export default AdminHome;
