import { useState } from "react";
import React from "react";

const Message = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      id="directors-message"
      className="flex flex-col md:flex-row gap-10 bg-gray-50 py-12 px-4 sm:px-6 md:px-10 items-center w-full"
    >
      {/* Left side: Image */}
      <div className="md:w-1/3 flex justify-center">
        <img
          src="https://www.iith.ac.in/assets/images/profiles/murty-bs.jpg"
          alt="Prof. Budaraju Srinivasa Murty"
          className="rounded-xl shadow-lg object-cover max-w-xs sm:max-w-sm md:max-w-md"
        />
      </div>

      {/* Right side: Text content */}
      <div className="text-left md:w-2/3 w-full">
        <p className="text-blue-600 uppercase text-lg font-semibold mb-2">
          Director's Message
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#607d8b] mb-4">
          Indian Institute of Information Technology <br /> Design and
          Manufacturing (IIITDM) Kurnool <br /> is the youngest among five
          centrally funded <br /> IIITDMs and established as part of <br /> Andhra
          Pradesh reorganization ...
        </h2>

        <button
          onClick={toggleModal}
          className="text-blue-600 hover:underline font-semibold"
        >
          Read more &nbsp;&raquo;
        </button>

        <div className="mt-6">
          <p className="font-bold text-gray-700 text-lg">
            Prof. Budaraju Srinivasa Murty
          </p>
          <p className="text-sm text-gray-500">
            Materials Science And Metallurgical Engineering
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] px-4">
          <div className="bg-white rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Director's Full Message</h2>
            <p className="text-gray-700 text-left text-sm sm:text-base mb-6">
              Indian Institute of Information Technology Design and Manufacturing
              (IIITDM) Kurnool is the youngest among five centrally funded IIITDMs
              and established as part of Andhra Pradesh reorganization act in the
              academic year 2015-16 at the historical city of Kurnool in Rayalaseema
              region. <br />
              Our Institute is recognized as an Institution of National Importance by
              an act of Parliament. The institute has a permanent campus at
              Jagannatha Gattu, Dinnedevarapadu, Kurnool. The institute offers four
              undergraduate programmes, namely, Computer Science and Engineering,
              Artificial Intelligence and Data Science, Electronics and Communication
              Engineering and Mechanical Engineering, with a total annual intake of
              240 students, three MTech Programmes, namely, Data Analytics and
              Decision Sciences, Electronic System Design and Smart manufacturing,
              with an annual intake of 45 students, and PhD programmes. <br />
              Our campus is located at one of the most scenic locations of Kurnool in
              a vast 190 acres of land, making it a best and pleasant place for young
              and aspiring students. Being adjacent to Nandyal – Kadapa highway, the
              institute is well connected to all parts of the country. <br />
              All the faculty are highly qualified with PhD degrees from reputed
              institutes across India and outside India. The Institute's goal is to
              provide aesthetically pleasing, environment-friendly green campus
              facilities to enhance the learning, teaching and interdisciplinary
              research activities. The Institute has organized various Techno-Cultural
              activities to enhance the practical learning and Industry Exposure of
              the students. I am sure that our students and faculty will carry the
              flagship of IIITDM Kurnool to greater heights by applying their
              knowledge in an interdisciplinary manner to provide solutions for
              various industrial, societal and research and development projects and
              will stand as responsible and dedicated technocrats in the process of
              nation building. <br /> <br />
              I wish my students all the best in all their endeavors. <br />
              Jai Hind
            </p>
            <div className="text-right">
              <button
                onClick={toggleModal}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;