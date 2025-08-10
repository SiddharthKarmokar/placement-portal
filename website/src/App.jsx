import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterNow from './components/RegisterNow';
import StudentDashboard from './components/studashboard';
import AdminStaff from './components/AdminStaff';
import StudentForm from './components/detailform';
import Home from './components/Home'; 
import JobBoard from "./admin/JobBoard.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import StudentLogin from './student/Student_login';
import AdminLogin from './admin/AdminLogin.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/register" element={<RegisterNow />} />
        <Route path="/admin" element={<AdminStaff />} />
        <Route path="/a" element={<StudentForm />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/jobs" element={<JobBoard />} />
        <Route path='/student/login' element={<StudentLogin/>}/>
        <Route path='/admin/login' element={<AdminLogin/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
