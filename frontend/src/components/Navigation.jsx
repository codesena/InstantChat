import React, { useEffect } from "react";
import { TfiMenu } from "react-icons/tfi";
import { MdOutlineMessage } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { loggedInUserDetails } from "../services/userServices.jsx";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../states/atoms.jsx";

const Navigation = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await loggedInUserDetails();
      setLoggedInUser({
        name: user.name,
        userId: user._id,
        email: user.email,
        profileUrl: user.profileUrl,
      });
    };
    fetchUserDetails();
  }, [setLoggedInUser]);
  return (
    <div className="flex flex-col justify-between items-center h-full py-4 bg-[#1a1a1a] border-r border-[#2e2e2e]">
      <div className="flex flex-col items-center gap-6">
        <NavIcon icon={<TfiMenu size={22} />} />
        <NavIcon icon={<MdOutlineMessage size={22} />} />
        <NavIcon icon={<IoSearchOutline size={22} />} />
        <NavIcon icon={<IoIosStarOutline size={22} />} />
      </div>
      <div className="flex flex-col items-center gap-6 mb-2">
        <NavIcon icon={<CiSettings size={22} />} />
        {loggedInUser.profileUrl ? (
          <img
            src={loggedInUser.profileUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-500"
          />
        ) : (
          <UserProfilePic size="36" />
        )}
      </div>
    </div>
  );
};

const NavIcon = ({ icon }) => (
  <div className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
    {icon}
  </div>
);

export default Navigation;
