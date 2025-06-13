import { useState, useRef } from "react";
import Navigation from "./Navigation.jsx";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import BlankWindow from "./BlankWindow.jsx";
import { useRecoilValue } from "recoil";
import { selectedProfileState, selectedUserIdState } from "../states/atoms.jsx";

const Layout = () => {
  const [chatlistWidth, setChatlistWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const isResizing = useRef(false);
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedProfile = useRecoilValue(selectedProfileState);

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

  return (
    <div
      className="flex h-screen bg-[#0f0f0f] text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="w-[50px] bg-[#141414] shrink-0 border-r border-[#1f1f1f] shadow-md">
        <Navigation />
      </div>
      <div
        style={{ width: `${chatlistWidth}px` }}
        className="relative shrink-0 bg-[#1a1a1a] border-r border-[#2a2a2a] shadow-inner"
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
      <div className="flex-grow min-w-0 bg-[#121212]">
        {selectedProfile.chatId || selectedUserId ? (
          <ChatWindow />
        ) : (
          <BlankWindow />
        )}
      </div>
    </div>
  );
};

export default Layout;
