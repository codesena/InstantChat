import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SearchBox from "./SearchBox.jsx";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { fetchAllChatId, fetchUsers } from "../services/userServices.jsx";
import NewChatIconWork from "./NewChatIconWork.jsx";
import NewChatModal from "./NewChatModal.jsx";
import { fetchChatsbyId } from "../services/chatServices.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  allChatIdState,
  chatsState,
  isModalOpenState,
  isValidChatIdState,
  profileNameState,
  searchTermState,
  selectedChatState,
  usersState,
} from "../states/atoms.jsx";
import NewGroupChatModal from "./NewGroupChatModal.jsx";

const Chatlist = () => {
  const setProfileName = useSetRecoilState(profileNameState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const setIsValidChatId = useSetRecoilState(isValidChatIdState);
  const [chats, setChats] = useRecoilState(chatsState);
  const setUsers = useSetRecoilState(usersState);
  const [allChatId, setAllChatId] = useRecoilState(allChatIdState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const senderId = jwtDecode(localStorage.getItem("token")).userId;

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      console.log(data);
      setUsers(() => data);
    } catch (err) {
      console.error("Error in fetching users:", err);
    }
  };

  useEffect(() => {
    const getChatId = async () => {
      try {
        const data = await fetchAllChatId();
        console.log("all chat id", data);
        setAllChatId(data);
      } catch (error) {
        console.log("error occured while ferching the all the ChatId", error);
      }
    };
    getChatId();
  }, [chats, setAllChatId]);

  const selectChatId = async ({ i }) => {
    setSelectedChat(i);
    setIsValidChatId(true);
    setProfileName(i.name || i.groupName);

    try {
      const response = await fetchChatsbyId({ chatId: i._id });
      setChats(new Map(response.chat.map((msg) => [msg._id, msg])));
    } catch (error) {
      console.log("Error while fetching chats" + error);
    }
  };

  const openNewChatModal = async () => {
    getUsers();
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen bg-[#181818]  flex flex-col">
      <div className="flex flex-row items-center justify-between m-2 px-3 ">
        <div className=" text-white text-xl font-bold">InstantChat</div>
        <div className="relative group">
          <NewChatIconWork onClick={openNewChatModal} />
          <div
            className="absolute left-1/2 -translate-x-1/2 mb-2 w-18 text-center 
                   bg-[#181818] text-xs rounded p-2 border-1 border-black opacity-0 
                  group-hover:opacity-100 transition-opacity delay-100 z-10"
          >
            New Chat
          </div>
        </div>
      </div>

      <NewChatModal />
      <NewGroupChatModal />
      <div className="flex flex-row gap-2 justify-center items-center p-2 w-full">
        <SearchBox
          id={"ChatlistSearchBox"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-grow overflow-auto p-2 space-y-2">
        {allChatId
          ?.filter((i) => {
            const name = i.isGroup ? i.groupName : i.name;
            return name?.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((i) => (
            <div
              key={i._id}
              className={`flex items-center gap-4 p-2 ${
                selectedChat?._id === i._id
                  ? "bg-[#515151]"
                  : "bg-[#181818] hover:bg-[#383838]"
              } rounded-lg`}
              onClick={() => selectChatId({ i })}
            >
              <UserProfilePic />
              <div className="min-w-0">
                {i.isGroup ? (
                  <span className="block truncate max-w-[500px]">
                    {i.groupName}
                  </span>
                ) : (
                  <div>
                    <span className="block truncate max-w-[500px]">
                      {i.userId == senderId ? i.name + " (You)" : i.name}
                    </span>
                  </div>
                )}
                <div className="text-[14px] truncate max-w-[500px]">
                  {i?.text}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chatlist;
