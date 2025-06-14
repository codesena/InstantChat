import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchChatsbyId } from "../services/chatServices.js";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { useState, useCallback } from "react";
import SearchBox from "./SearchBox.jsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allChatIdState,
  chatsState,
  groupUsersState,
  isGroupModalOpenState,
  isModalOpenState,
  isValidChatIdState,
  loggedInUserState,
  selectedProfileState,
  selectedUserIdState,
  usersState,
} from "../states/atoms.jsx";

const NewChatModal = () => {
  const [userSearchTerm, setUserSearchTerm] = useState();
  const users = useRecoilValue(usersState);
  const allChatId = useRecoilValue(allChatIdState);
  const setSelectedUserId = useSetRecoilState(selectedUserIdState);
  const setChats = useSetRecoilState(chatsState);
  const setIsValidChatId = useSetRecoilState(isValidChatIdState);
  const setIsGroupModalOpen = useSetRecoilState(isGroupModalOpenState);
  const setGroupUsers = useSetRecoilState(groupUsersState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const setSelectedProfile = useSetRecoilState(selectedProfileState);
  const loggedInUser = useRecoilValue(loggedInUserState);

  const isChatIdPresent = useCallback(
    async (user) => {
      setSelectedUserId(user._id);
      setIsModalOpen(false);
      setSelectedProfile((prev) => ({
        ...prev,
        profileName: user.name,
        profileUrl: user.profileUrl,
      }));

      let foundChat = null;
      for (const element of allChatId) {
        if (!element.isGroup && element.userId === user._id) {
          foundChat = element;
          break;
        }
      }

      if (!foundChat) {
        setIsValidChatId(false);
        setChats(new Map());
      } else {
        setSelectedProfile((prev) => ({
          ...prev,
          chatId: foundChat._id,
          profileUrl: foundChat?.profileUrl || "",
        }));
        setIsValidChatId(true);
        try {
          const response = await fetchChatsbyId({ chatId: foundChat._id });
          setChats(new Map(response.chat.map((msg) => [msg._id, msg])));
        } catch (error) {
          console.log("Error while fetching chats", error);
          setChats(new Map());
        }
      }
    },
    [
      allChatId,
      setChats,
      setIsModalOpen,
      setIsValidChatId,
      setSelectedProfile,
      setSelectedUserId,
    ]
  );

  // Filter users based on search term to avoid rerender filtering on every render
  const filteredUsers = users?.filter(
    (user) =>
      !userSearchTerm ||
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#242424] rounded-xl p-6 w-80 shadow-lg relative">
            <div className="flex flex-row justify-between text-xl font-bold mb-3">
              <div>New Chat</div>
              <button onClick={() => setIsModalOpen(false)}>
                <IoCloseCircleOutline />
              </button>
            </div>
            <div className="my-1">
              <SearchBox
                id="UserSearchBox"
                placeholder="Search Users"
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
              />
            </div>
            <ul className="relative space-y-1.5 max-h-96 overflow-auto">
              <li
                className="flex flex-row gap-2 items-center p-2 rounded hover:bg-[#383838] cursor-pointer"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsGroupModalOpen(true);
                  setGroupUsers([]);
                }}
              >
                <UserProfilePic size="36" />
                <div>New Group</div>
              </li>
              {filteredUsers?.map((user) => (
                <li
                  key={user._id}
                  className="p-2 rounded hover:bg-[#383838] cursor-pointer"
                  onClick={() => isChatIdPresent(user)}
                >
                  <div className="flex flex-row items-center gap-2">
                    {user?.profileUrl ? (
                      <img
                        src={user.profileUrl}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-gray-500"
                      />
                    ) : (
                      <UserProfilePic size="36" />
                    )}
                    {loggedInUser.userId === user._id ? (
                      <span>{user.name} (You)</span>
                    ) : (
                      <span>{user.name}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NewChatModal;
