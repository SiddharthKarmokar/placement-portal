import React from "react";

const LogoNav = () => {
  return (
    <nav className="flex justify-center w-[80vw] items-center gap-3 p-4 rounded-full bg-white shadow-xl">
      <img className="w-[40px]" src="/logo.webp" alt="logo" />
      <span className="text-3xl text-gray-900">
        Training and Placement Cell, IIITDM Kurnool
      </span>
    </nav>
  );
};

export default LogoNav;
