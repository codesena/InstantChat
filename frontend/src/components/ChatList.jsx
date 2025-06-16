import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SearchBox from "./SearchBox.jsx";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { fetchAllChatId, fetchUsers } from "../services/userServices.jsx";
import NewChatIconWork from "./NewChatIconWork.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import NewChatModal from "./NewChatModal.jsx";
import { fetchChatsbyId } from "../services/chatServices.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allChatIdState,
  chatsState,
  isChatWindowModalOpenState,
  isValidChatIdState,
  openMobileSettingModalState,
  searchTermState,
  selectedProfileState,
  tokenState,
  usersState,
} from "../states/atoms.jsx";
import NewGroupChatModal from "./NewGroupChatModal.jsx";
import MobileSettingModal from "./MobileSettingModal.jsx";

const ChatList = () => {
  const [selectedProfile, setSelectedProfile] =
    useRecoilState(selectedProfileState);
  const setIsValidChatId = useSetRecoilState(isValidChatIdState);
  const [openMobileSettingModal, setOpenMobileSettingModal] = useRecoilState(
    openMobileSettingModalState
  );

  const [chats, setChats] = useRecoilState(chatsState);
  const setUsers = useSetRecoilState(usersState);
  const [allChatId, setAllChatId] = useRecoilState(allChatIdState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const setIsChatWindowModalOpen = useSetRecoilState(
    isChatWindowModalOpenState
  );
  const token = useRecoilValue(tokenState);
  const senderId = jwtDecode(token)?.userId;

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(() => data);
    } catch (err) {
      console.error("Error in fetching users:", err);
    }
  };

  useEffect(() => {
    const getChatId = async () => {
      try {
        const data = await fetchAllChatId();
        setAllChatId(data);
      } catch (error) {
        console.log("Error fetching all Chat IDs", error);
      }
    };
    getChatId();
  }, [chats, setAllChatId]);

  const selectChatId = async ({ i }) => {
    setIsValidChatId(true);
    setSelectedProfile((prev) => ({
      ...prev,
      profileName: i.name || i.groupName,
      chatId: i._id,
      profileUrl: i.profileUrl,
    }));
    try {
      const response = await fetchChatsbyId({ chatId: i._id });
      setChats(new Map(response.chat.map((msg) => [msg._id, msg])));
    } catch (error) {
      console.log("Error while fetching chats" + error);
    }
  };

  const openNewChatModal = async () => {
    getUsers();
    setIsChatWindowModalOpen(true);
  };

  return (
    <div className="h-screen bg-[#181818] flex flex-col border-r border-[#2e2e2e]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2e2e2e]">
        <div className="text-white text-xl font-bold tracking-wide">
          InstantChat
        </div>
        <div className="flex flex-row justify-center  items-center gap-3">
          <div className="relative group">
            <NewChatIconWork onClick={openNewChatModal} />
            <div className="absolute top-6 -right-6  mb-2 w-20 text-center bg-gray-950 text-xs text-white rounded-md py-1 px-2 border border-gray-700 opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10">
              New Chat
            </div>
          </div>

          <div className="relative group hidden [@media(max-width:400px)]:block">
            <BsThreeDotsVertical
              size={18}
              onClick={() => setOpenMobileSettingModal(true)}
            />

            {openMobileSettingModal && (
              <div className="absolute top-5 -right-3 bg-[#1e1e1e] text-white rounded-md z-20 shadow-lg">
                <MobileSettingModal />
              </div>
            )}
          </div>
        </div>
      </div>

      <NewChatModal />
      <NewGroupChatModal />

      <div className="px-4 py-2">
        <SearchBox
          id="ChatlistSearchBox"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-grow overflow-y-auto px-2 space-y-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        {Array.isArray(allChatId) &&
          allChatId
            ?.filter((i) => {
              const name = i.isGroup ? i.groupName : i.name;
              return name?.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((i) => (
              <div
                key={i._id}
                onClick={() => selectChatId({ i })}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedProfile?.chatId === i._id
                    ? "bg-[#2f2f2f]"
                    : "hover:bg-[#2a2a2a] bg-[#181818]"
                }`}
              >
                {i?.profileUrl ? (
                  <img
                    src={i.profileUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                  />
                ) : (
                  <UserProfilePic />
                )}
                <div className="min-w-0 text-white">
                  <span className="block font-medium truncate max-w-[200px]">
                    {i.isGroup
                      ? i.groupName
                      : i.userId === senderId
                      ? `${i.name} (You)`
                      : i.name}
                  </span>
                  <span className="block text-sm text-gray-400 truncate max-w-[200px]">
                    {i?.text}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ChatList;
