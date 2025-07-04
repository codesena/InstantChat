import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox.jsx";
import socket from "../services/Socket.jsx";
import { jwtDecode } from "jwt-decode";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  chatsState,
  isValidChatIdState,
  selectedProfileState,
  selectedUserIdState,
} from "../states/atoms.jsx";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import SendButton from "./SendButton.jsx";
import ProfileModal from "./ProfileModal.jsx";

export default function ChatWindow() {
  const [selectedProfile, setSelectedProfile] =
    useRecoilState(selectedProfileState);
  const [selectedUserId, setSelectedUserId] =
    useRecoilState(selectedUserIdState);
  const [isValidChatId, setIsValidChatId] = useRecoilState(isValidChatIdState);
  const [chats, setChats] = useRecoilState(chatsState);
  const resetSelectedProfile = useResetRecoilState(selectedProfileState);
  const token = localStorage.getItem("token");
  const senderId = jwtDecode(token).userId;
  const messagesEndRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [middleHeight, setMiddleHeight] = useState(0);
  const inputBoxRef = useRef();
  // const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);

  function sendMessage() {
    let message = inputBoxRef.current?.value;
    inputBoxRef.current.value = "";
    inputBoxRef.current?.focus();
    if (!message.trim()) return;
    const _id = Date.now().toString();
    const newMessage = {
      _id,
      senderId,
      text: message,
      createdAt: new Date().toISOString(),
    };

    if (isValidChatId) newMessage.chatId = selectedProfile.chatId;
    else newMessage.receiverId = selectedUserId;

    setChats((prevChats) => {
      const newMap = prevChats instanceof Map ? new Map(prevChats) : new Map();
      newMap.set(_id, newMessage);
      return newMap;
    });

    socket.emit("message", newMessage);
  }

  useEffect(() => {
    const handleErrorMessage = (data) => {
      console.error("Error from server:", data.error);
    };

    socket.on("errorMessage", handleErrorMessage);
    return () => {
      socket.off("errorMessage", handleErrorMessage);
    };
  }, []);

  useEffect(() => {
    const handleReceiverMessage = ({ _id: oldMessageId, storedNewMessage }) => {
      if (!isValidChatId) {
        setSelectedProfile((prev) => ({
          ...prev,
          chatId: storedNewMessage.chatId,
        }));
        setIsValidChatId(true);
      }
      setChats((prev) => {
        const newMap = new Map(prev);
        newMap.set(storedNewMessage._id, storedNewMessage);
        newMap.delete(oldMessageId);
        return newMap;
      });
    };

    socket.on("receiverMessage", handleReceiverMessage);
    return () => {
      socket.off("receiverMessage", handleReceiverMessage);
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [chats, middleHeight]);

  const updateHeight = () => {
    const topH = topRef.current?.offsetHeight || 0;
    const bottomH = bottomRef.current?.offsetHeight || 0;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const available = viewportHeight - topH - bottomH;
    setMiddleHeight(available);
  };

  useEffect(() => {
    updateHeight();
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col">
      <div className="flex flex-col w-full  bg-[#1f1f1f]">
        <div
          ref={topRef}
          className="flex items-center gap-4 px-4 bg-[#181818] h-[72px] border-b border-[#2e2e2e] shadow-sm"
        >
          <div className="flex items-center">
            {
              <FaArrowLeft
                size={20}
                onClick={() => {
                  resetSelectedProfile();
                  setSelectedUserId(null);
                }}
                className=" mr-2 block sm:hidden"
              />
            }
            {/* <div onClick={() => setIsProfileImageOpen(true) }> */}
              {selectedProfile.profileUrl ? (
                <img
                  src={selectedProfile.profileUrl}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-600"
                />
              ) : (
                <UserProfilePic size="36" />
              )}
            </div>
          {/* </div> */}
          <div className="text-white text-lg font-semibold truncate max-w-[70%]">
            {selectedProfile.profileName}
          </div>
        </div>
         {/* {isProfileImageOpen &&<div>
          <ProfileModal/>
          </div>} */}
        <div
          style={{ height: middleHeight }}
          className="overflow-auto px-6 py-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent"
        >
          {[...chats.values()].map(
            ({
              _id,
              senderId: sender,
              chatId: currentChatId,
              text,
              createdAt,
            }) =>
              selectedProfile?.chatId === currentChatId && (
                <div
                  key={_id}
                  className={`mb-2 ${
                    sender === senderId ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl max-w-[75%] break-words text-sm ${
                      sender === senderId
                        ? "bg-[#00483a] text-white"
                        : "bg-[#2e2e2e] text-gray-200"
                    }`}
                  >
                    <div>{text}</div>
                    <div className="text-[11px] mt-1 text-gray-400 text-right">
                      {new Date(createdAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              )
          )}
          <div ref={messagesEndRef} />
        </div>

        <div ref={bottomRef} className=" w-full ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex justify-between items-center p-3 h-[60px]  m-3 bg-[#2c2c2c]  border border-[#2e2e2e] rounded-full overflow-clip "
          >
            <InputBox inputBoxRef={inputBoxRef} sendMessage={sendMessage} />
            <SendButton onClick={sendMessage} />
          </form>
        </div>
      </div>
    </div>
  );
}
