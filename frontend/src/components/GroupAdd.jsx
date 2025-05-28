import React from "react";
import GroupAddIcon from "../icons/GroupAddIcon.jsx";

const GroupAdd = ({ onClick }) => {
  return (
    <div
      className="relative group inline-block cursor-pointer"
      onClick={onClick}
    >
      <GroupAddIcon size={32} />
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                       hidden group-hover:block bg-[#2f2f2f] text-white text-xs 
                       px-2 py-1 rounded-lg shadow-lg whitespace-nowrap z-10"
      >
        Create Group
      </span>
    </div>
  );
};

export default GroupAdd;
