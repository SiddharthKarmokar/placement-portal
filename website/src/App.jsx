import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterNow from "./components/RegisterNow";
import StudentDashboard from "./components/studashboard";
import AdminStaff from "./components/AdminStaff";
import StudentForm from "./components/detailform";
import Home from "./components/Home";
import Student_login from "./student/Student_login";
import JobBoard from "./admin/JobBoard.jsx";
import JobPost from "./admin/JobPost.jsx";
import JobGet from "./student/JobGet.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import StudentLogin from "./student/Student_login";
import AdminLogin from "./admin/AdminLogin.jsx";
import { RotateCcwKey } from "lucide-react";
import StudentHome from "./student/StudentHome.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterNow />} />
        <Route path="/adminstaff" element={<AdminStaff />} />
        <Route path="/a" element={<StudentForm />} />
        <Route path="/admin/:name" element={<AdminHome />} />
        <Route path="/student/:name" element={<StudentDashboard />} />
        <Route path="/admin/jobs" element={<JobBoard />} />
        <Route path="/admin/post" element={<JobPost />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/get" element={<JobGet />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
