import React, { useEffect, useRef } from "react";
import InputBox from "./InputBox.jsx";
import socket from "../services/Socket.jsx";
import { jwtDecode } from "jwt-decode";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chatsState,
  isValidChatIdState,
  selectedProfileState,
  selectedUserIdState,
} from "../states/atoms.jsx";
import UserProfilePic from "../icons/UserProfilePic.jsx";

const ChatWindow = () => {
  const [selectedProfile, setSelectedProfile] =
    useRecoilState(selectedProfileState);
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const [isValidChatId, setIsValidChatId] = useRecoilState(isValidChatIdState);
  const [chats, setChats] = useRecoilState(chatsState);

  const token = localStorage.getItem("token");
  const senderId = jwtDecode(token).userId;
  const messagesEndRef = useRef(null);

  const sendMessage = (message) => {
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
  };

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col">
      <div className="flex items-center gap-4 px-6 bg-[#181818] h-[72px] border-b border-[#2e2e2e] shadow-sm">
        <div className="flex items-center">
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
        <div className="text-white text-lg font-semibold truncate max-w-[70%]">
          {selectedProfile.profileName}
        </div>
      </div>

      <div
        className="flex-grow overflow-y-auto px-6 py-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent"
        style={{ height: "calc(100vh - 72px - 60px)" }}
      >
        {[...chats.values()].map(
          ({ _id, senderId: sender, chatId: currentChatId, text, createdAt }) =>
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

      <div className="h-[60px] bg-[#2c2c2c] px-4 py-2 border-t border-[#2e2e2e]">
        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
