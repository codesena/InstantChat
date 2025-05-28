import React from "react";
import { TfiMenu } from "react-icons/tfi";
import { MdOutlineMessage } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import UserProfilePic from "../icons/UserProfilePic.jsx";
const Navigation = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center h-full p-1">
        <div className="flex flex-col items-center gap-4  p-2">
          <TfiMenu size={24} />
          <MdOutlineMessage size={24} />
          <IoSearchOutline size={24} />
          <IoIosStarOutline size={24} />
        </div>
        <div className="flex flex-col items-center gap-4   p-2 mt-4">
          <CiSettings size={24} />
          <UserProfilePic size="40" />
        </div>
      </div>
    </>
  );
};

export default Navigation;
