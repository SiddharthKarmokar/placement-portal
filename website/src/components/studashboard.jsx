import React, { useState } from 'react';

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: 'Amit Kumar',
    fatherName: 'Rajesh Kumar',
    rollNumber: '119ad0000',
    dob: '2001-07-15',
    email: 'amit.kumar@example.com',
    mobileNumber: '9876543210',
    gender: 'Male',
    address: 'Flat No. 101, Shanti Apartments, Sector 10, New Delhi, India',
    linkedin: 'https://linkedin.com/in/',
    github: 'https://github.com/',
    portfolio: 'https://portfolio.com',
    degreeDetails: {
      degree: 'Bachelor of Technology',
      major: 'Computer Science and Engineering',
      branch: 'CSE',
      year: '3rd Year',
      expectedPassout: '2025',
      gpa: '8.9',
      cgpa: '8.7',
    },
    academicRecords: [
      { year: '1st Year', gpa: '8.5' },
      { year: '2nd Year', gpa: '8.8' },
      { year: '3rd Year', gpa: '8.9' },
    ],
    certifications: [
      { title: 'AWS Certified Solutions Architect', year: '2023' },
      { title: 'React Developer Certification', year: '2022' },
    ],
    internships: [
      { company: 'Infosys Ltd.', role: 'Software Engineer Intern', duration: 'May 2023 - Aug 2023' },
      { company: 'TCS Digital', role: 'Web Developer Intern', duration: 'Jan 2023 - Apr 2023' },
    ],
    achievements: [
      { title: '1st Place in Coding Marathon', year: '2022' },
      { title: 'Academic Excellence Award', year: '2021' },
      { title: 'Hackathon Winner - IIITDM Kurnool', year: '2023' },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Data Structures', 'Algorithms'],
    projects: [
      { title: 'E-commerce Web Application', description: 'Developed a full-stack e-commerce platform with payment gateway integration.' },
      { title: 'Machine Learning Model', description: 'Built a predictive model for customer segmentation using Python and scikit-learn.' },
    ],
  });

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Student Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col items-center md:flex-row md:items-start">
        <div className="bg-blue-500 text-white rounded-full w-32 h-32 md:w-48 md:h-48 flex items-center justify-center text-7xl font-bold mr-0 md:mr-6 mb-4 md:mb-0">
          {getInitials(student.name)}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-700">{student.name}</h2>
          <p className="text-lg"><strong>Father's Name:</strong> {student.fatherName}</p>
          <p className="text-lg"><strong>Roll Number:</strong> {student.rollNumber}</p>
          <p className="text-lg"><strong>Date of Birth:</strong> {student.dob}</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            <a href={student.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
            <a href={student.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Contact Information</h2>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Address:</strong> {student.address}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Degree Details</h2>
          <p><strong>Degree:</strong> {student.degreeDetails.degree}</p>
          <p><strong>Major:</strong> {student.degreeDetails.major}</p>
          <p><strong>Branch:</strong> {student.degreeDetails.branch}</p>
          <p><strong>Year:</strong> {student.degreeDetails.year}</p>
          <p><strong>Expected Passout:</strong> {student.degreeDetails.expectedPassout}</p>
          <p><strong>GPA:</strong> {student.degreeDetails.gpa}</p>
          <p><strong>CGPA:</strong> {student.degreeDetails.cgpa}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Skills</h2>
          <div className="flex flex-wrap">
            {student.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full m-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Achievements</h2>
          <ul className="list-disc list-inside">
            {student.achievements.map((achievement, index) => (
              <li key={index}>{achievement.title} - {achievement.year}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Academic Records</h2>
          <ul className="list-disc list-inside">
            {student.academicRecords.map((record, index) => (
              <li key={index}>{record.year}: GPA - {record.gpa}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Certifications</h2>
          <ul className="list-disc list-inside">
            {student.certifications.map((cert, index) => (
              <li key={index}>{cert.title} - {cert.year}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Internship Experience</h2>
          {student.internships.map((internship, index) => (
            <div key={index} className="mb-2">
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Role:</strong> {internship.role}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Projects</h2>
        {student.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
