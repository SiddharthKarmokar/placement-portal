import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlacementLogin from './components/PlacementLogin';
import RegisterNow from './components/RegisterNow';
import StudentDashboard from './components/studashboard';
import AdminStaff from './components/AdminStaff';
import StudentForm from './components/detailform';
import Home from './components/Home'; 
import Student_login from './student/Student_login';
import JobBoard from "./admin/JobBoard.jsx";
import AdminHome from "./admin/AdminHome.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashaboard" element={<StudentDashboard />} />
        <Route path="/login" element={<PlacementLogin />} />
        <Route path="/register" element={<RegisterNow />} />
        <Route path="/admin" element={<AdminStaff />} />
        <Route path="/a" element={<StudentForm />} />
        <Route path="/StudentLogin" element={<Student_login/>} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/jobs" element={<JobBoard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
