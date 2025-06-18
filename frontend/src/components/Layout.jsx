import { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation.jsx";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import BlankWindow from "./BlankWindow.jsx";
import { useRecoilValue } from "recoil";
import {
  openProfileState,
  openSettingState,
  selectedProfileState,
  selectedUserIdState,
} from "../states/atoms.jsx";
import SettingsModal from "./SettingModal.jsx";
import ProfileModal from "./ProfileModal.jsx";

const Layout = () => {
  const [chatlistWidth, setChatlistWidth] = useState(250);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isDragging, setIsDragging] = useState(false);
  const isResizing = useRef(false);
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedProfile = useRecoilValue(selectedProfileState);
  const openSetting = useRecoilValue(openSettingState);
  const openProfile = useRecoilValue(openProfileState);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = Math.min(Math.max(e.clientX - 50, 250), 500);
    setChatlistWidth(newWidth);
  };

  const handleMouseUp = () => {
    if (isResizing.current) {
      isResizing.current = false;
      setIsDragging(false);
      document.body.style.cursor = "default";
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className="flex h-screen bg-[#0f0f0f] text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="block [@media(max-width:400px)]:hidden w-[60px] bg-[#141414] shrink-0 border-r border-[#1f1f1f] shadow-md">
        <Navigation />
      </div>

      <div
        style={{
          width:
            window.innerWidth >= 640 || selectedProfile.chatId || selectedUserId
              ? `${chatlistWidth}px`
              : undefined,
        }}
        className={`relative shrink-0 min-w-[265px] bg-[#1a1a1a] border-r border-[#2a2a2a] shadow-inner
    ${selectedProfile.chatId || selectedUserId ? "hidden sm:block" : "block"}
    ${
      selectedProfile.chatId || selectedUserId
        ? "sm:w-[250px]"
        : "w-full sm:w-[250px]"
    }`}
      >
        <ChatList />
        <div
          className={`absolute top-0 right-0 h-full transition-all duration-150 ease-in-out ${
            isDragging
              ? "w-1.5 bg-gray-500"
              : "w-0.5 bg-[#2b2b2b] hover:w-1.5 hover:bg-gray-500"
          } cursor-col-resize`}
          onMouseDown={handleMouseDown}
        />
      </div>

      <div
        className={`flex-grow min-w-0 bg-[#121212] ${
          selectedProfile.chatId || selectedUserId ? "block" : "hidden"
        } sm:block`}
      >
        {selectedProfile.chatId || selectedUserId ? (
          <ChatWindow />
        ) : (
          <BlankWindow />
        )}
      </div>

      {openSetting && (
        <div className={`${windowWidth > 400 ? "block" : "hidden"}`}>
          <SettingsModal />
        </div>
      )}

      {openProfile && (
        <>
          <div className="fixed inset-0 z-20 flex justify-center items-center sm:hidden">
            <ProfileModal  />
          </div>
          <div className="hidden sm:block fixed bottom-4 left-4 z-20">
            <ProfileModal />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
