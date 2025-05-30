import React, { useEffect, useRef } from "react";
import InputBox from "./InputBox.jsx";
import UserProfile from "../icons/UserProfilePic.jsx";
import socket from "../services/Socket.jsx";
import { jwtDecode } from "jwt-decode";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chatsState,
  isValidChatIdState,
  profileNameState,
  selectedChatState,
  selectedUserIdState,
} from "../states/atoms.jsx";
const ChatWindow = () => {
  const profileName = useRecoilValue(profileNameState);
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
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

    if (isValidChatId) newMessage.chatId = selectedChat._id;
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
        setSelectedChat({ _id: storedNewMessage.chatId });
        setIsValidChatId(true);
      }
      setChats((prev) => {
        const newMap = new Map(prev);
        newMap.set(storedNewMessage._id, storedNewMessage);
        newMap.delete(oldMessageId);
        return newMap;
      });
      console.log("storedNewMessage", storedNewMessage);
    };

    socket.on("receiverMessage", handleReceiverMessage);
    return () => {
      socket.off("receiverMessage", handleReceiverMessage);
    };
  }); // subscribe once on mount

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col relative">
      {/* Chat Header */}
      <div className="flex items-center gap-4 bg-[#181818] h-[72px] pl-10 text-xl font-bold">
        <div className="flex items-center h-16">
          <UserProfile />
        </div>
        <div>{profileName}</div>
      </div>

      <div
        className="overflow-auto pl-8 pr-8 pt-1 pb-1"
        style={{ height: "calc(100vh - 72px - 60px)" }}
      >
        {[...chats.values()].map(
          ({ _id, senderId: sender, chatId: currentChatId, text, createdAt }) =>
            selectedChat?._id === currentChatId ? (
              <div
                key={_id}
                className={`${
                  sender === senderId ? "text-right" : "text-left"
                }`}
              >
                <div className="bg-[#00483a] text-white rounded-2xl py-2 px-4 m-1 inline-block max-w-[70%] break-words">
                  <div>{text}</div>
                  <div className="text-xs mt-1 text-gray-300 text-right">
                    {new Date(createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ) : null
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-row content-center items-center sticky bottom-0 w-full h-[60px] bg-[#303030]">
        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
