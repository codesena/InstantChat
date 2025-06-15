import { useSetRecoilState } from "recoil";
import { openProfileState, openSettingState } from "../states/atoms.jsx";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SettingsModal = () => {
  const setOpenSetting = useSetRecoilState(openSettingState);
  const setOpenProfile = useSetRecoilState(openProfileState);
  const navigate = useNavigate();
  const logout = () => {
    setOpenSetting(false);
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="fixed bottom-4 left-4 w-36 bg-[#1e1e1e] text-white rounded-lg shadow-lg z-[9999]">
      <div className="flex flex-col py-2">
        <button
          onClick={() => setOpenSetting(false)}
          className="flex justify-end mx-2 "
        >
          <IoCloseCircleOutline
            size={22}
            className="text-gray-400 hover:text-white"
          />
        </button>
        <button
          onClick={() => {
            setOpenProfile(true), setOpenSetting(false);
          }}
          className="px-4 py-2 hover:bg-[#2a2a2a] text-left"
        >
          Profile
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 hover:bg-[#2a2a2a] text-left text-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
