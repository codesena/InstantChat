import { useEffect } from "react";
import { TfiMenu } from "react-icons/tfi";
import { MdOutlineMessage } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { loggedInUserDetails } from "../services/userServices.jsx";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInUserState, openSettingState } from "../states/atoms.jsx";

const Navigation = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const setOpenSetting = useSetRecoilState(openSettingState);
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
      <div className="flex flex-col items-center gap-6 mb-6">
        <NavIcon icon={<TfiMenu size={28} />} />
        <NavIcon icon={<MdOutlineMessage size={28} />} />
        <NavIcon icon={<IoSearchOutline size={28} />} />
        <NavIcon icon={<IoIosStarOutline size={28} />} />
      </div>
      <div className="flex flex-col items-center gap-6 mb-2">
        <NavIcon
          icon={
            <CiSettings
              size={28}
              onClick={() => setOpenSetting(true)}
              className="z-20"
            />
          }
        />
        {loggedInUser.profileUrl ? (
          <img
            src={loggedInUser.profileUrl}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover border border-gray-500"
          />
        ) : (
          <UserProfilePic size="32" />
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
