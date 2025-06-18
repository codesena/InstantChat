import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  loggedInUserState,
  openMobileSettingModalState,
  openProfileState,
  openSettingState,
} from "../states/atoms.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import FullProfilePicModal from "./FullProfilePicModal.jsx";

const ProfileModal = () => {
  const setOpenSetting = useSetRecoilState(openSettingState);
  const setOpenProfile = useSetRecoilState(openProfileState);
  const setOpenMobileSettingModal = useSetRecoilState(
    openMobileSettingModalState
  );

  const loggedInUser = useRecoilValue(loggedInUserState);
  const [showFullImage, setShowFullImage] = useState(false);

  if (showFullImage) {
    return (
      <FullProfilePicModal
        profileUrl={loggedInUser.profileUrl}
        onClick={() => setShowFullImage(false)}
      />
    );
  }

  return (
    <div className="w-72 min-h-80 bg-[#1e1e1e] text-white rounded-xl shadow-2xl p-4">
      <div
        onClick={() => {
          setOpenProfile(false);
          if (window.innerWidth > 400) {
            setOpenSetting(true);
          } else {
            setOpenMobileSettingModal(true);
          }
        }}
        className="flex flex-row justify-between items-center mb-4 text-gray-400 hover:text-white transition-all"
      >
        <div>
          <FaArrowLeft size={22} />
        </div>
        <div className="flex w-full justify-center text-white text-3xl mr-6 ">
          Profile
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <img
          src={loggedInUser.profileUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border border-gray-500 cursor-pointer"
          onClick={() => setShowFullImage(true)}
        />
        <div className="text-xl font-semibold">{loggedInUser.name}</div>
        <div className="text- text-gray-300">{loggedInUser.email}</div>
      </div>
    </div>
  );
};

export default ProfileModal;
