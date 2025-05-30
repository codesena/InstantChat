import { useState, useRef } from "react";
import Navigation from "./Navigation.jsx";
import Chatlist from "./Chatlist.jsx";
import ChatWindow from "./ChatWindow.jsx";
import BlankWindow from "./BlankWindow.jsx";
import { useRecoilValue } from "recoil";
import { selectedChatState, selectedUserIdState } from "../states/atoms.jsx";

const Layout = () => {
  const [chatlistWidth, setChatlistWidth] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const isResizing = useRef(false);

  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedChat = useRecoilValue(selectedChatState);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
    setIsDragging(true); // ✅ enable dragging
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
      setIsDragging(false); // ✅ stop dragging
      document.body.style.cursor = "default";
    }
  };

  return (
    <div
      className="flex h-screen text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="w-[50px] bg-[#141414] shrink-0 border-[#1d1d1d] border-r-2">
        <Navigation />
      </div>
      <div
        style={{ width: `${chatlistWidth}px` }}
        className="relative shrink-0 "
      >
        <Chatlist />

        <div
          className={`absolute top-0 right-0 h-full ${
            isDragging
              ? "w-1.5 bg-gray-600"
              : "w-0.5 bg-[#2b2b2b] hover:w-1.5 hover:bg-gray-600"
          } cursor-col-resize transition-all duration-150`}
          onMouseDown={handleMouseDown}
        />
      </div>

      <div className="flex-grow min-w-0 border-l border-[#1d1d1d]">
        {selectedChat || selectedUserId ? <ChatWindow /> : <BlankWindow />}
      </div>
    </div>
  );
};

export default Layout;
