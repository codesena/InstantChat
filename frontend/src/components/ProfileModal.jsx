import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  loggedInUserState,
  openMobileSettingModalState,
  openProfileState,
  openSettingState,
} from "../states/atoms.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

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
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
        <button
          onClick={() => setShowFullImage(false)}
          className="absolute top-4 left-4 text-gray-400 hover:text-white text-2xl"
        >
          <FaArrowLeft />
        </button>
        <img
          src={loggedInUser.profileUrl}
          alt="Full Avatar"
          className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 w-72 min-h-80 bg-[#1e1e1e] text-white rounded-xl shadow-2xl z-[9999] p-4">
      <button
        onClick={() => {
          setOpenProfile(false);
          if (window.innerWidth > 400) {
            setOpenSetting(true);
          } else {
            setOpenMobileSettingModal(true);
          }
        }}
        className="mb-4 text-gray-400 hover:text-white transition-all"
      >
        <FaArrowLeft size={22} />
      </button>

      <div className="flex flex-col items-center gap-3">
        <img
          src={loggedInUser.profileUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border border-gray-500 cursor-pointer"
          onClick={() => setShowFullImage(true)}
        />
        <div className="text-lg font-semibold">{loggedInUser.name}</div>
        <div className="text-sm text-gray-300">{loggedInUser.email}</div>
        <div className="text-xs text-gray-500">ID: {loggedInUser.userId}</div>
      </div>
    </div>
  );
};

export default ProfileModal;
