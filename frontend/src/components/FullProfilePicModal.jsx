import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const FullProfilePicModal = ({ profileUrl, onClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
      <button
        onClick={onClick}
        className="absolute top-4 left-4 text-gray-400 hover:text-white text-2xl"
      >
        <FaArrowLeft />
      </button>
      <img
        src={profileUrl}
        alt="Full Avatar"
        className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
      />
    </div>
  );
};

export default FullProfilePicModal;
