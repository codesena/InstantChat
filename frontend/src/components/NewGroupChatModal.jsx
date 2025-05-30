import React, { useEffect, useState, useCallback, useMemo } from "react";
import SearchBox from "./SearchBox.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import UserProfilePic from "../icons/UserProfilePic.jsx";
import { GroupCreation } from "../services/chatServices.js";
import { jwtDecode } from "jwt-decode";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatsState,
  groupUsersState,
  isGroupModalOpenState,
  isModalOpenState,
  isValidChatIdState,
  profileNameState,
  selectedChatState,
  usersState,
} from "../states/atoms.jsx";

const NewGroupChatModal = () => {
  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");

  const setProfileName = useSetRecoilState(profileNameState);
  const setChats = useSetRecoilState(chatsState);
  const setIsValidChatId = useSetRecoilState(isValidChatIdState);
  const setSelectedChat = useSetRecoilState(selectedChatState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const users = useRecoilValue(usersState);

  const [groupUsers, setGroupUsers] = useRecoilState(groupUsersState);
  const [isGroupModalOpen, setIsGroupModalOpen] = useRecoilState(
    isGroupModalOpenState
  );

  const userId = useMemo(() => {
    try {
      return jwtDecode(localStorage.getItem("token")).userId;
    } catch {
      return null;
    }
  }, []);

  const isUserSelected = useCallback(
    (id) => groupUsers.includes(id),
    [groupUsers]
  );

  const toggleUser = useCallback(
    (id) => {
      if (isUserSelected(id)) {
        setGroupUsers(groupUsers.filter((userId) => userId !== id));
      } else {
        setGroupUsers([...groupUsers, id]);
      }
    },
    [groupUsers, setGroupUsers, isUserSelected]
  );

  useEffect(() => {
    setShowNext(groupUsers.length > 0 && !showCreateGroup);
  }, [groupUsers, showCreateGroup]);

  const createGroup = useCallback(
    async ({ users }) => {
      const res = await GroupCreation({ users, groupName });
      return res;
    },
    [groupName]
  );

  const cancel = useCallback(() => {
    setShowCreateGroup(false);
    setShowNext(false);
    setIsGroupModalOpen(false);
    setIsModalOpen(true);
  }, [setIsGroupModalOpen, setIsModalOpen]);

  // Filter users once
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user._id !== userId)
      .filter((user) =>
        groupSearchTerm
          ? user.name.toLowerCase().includes(groupSearchTerm.toLowerCase())
          : true
      );
  }, [users, userId, groupSearchTerm]);

  return (
    <>
      {isGroupModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#242424] rounded-xl p-6 w-80 shadow-lg relative">
            <div className="flex flex-row gap-2 mb-2 items-center">
              <div
                className="hover:cursor-pointer"
                onClick={() => {
                  setIsGroupModalOpen(false);
                  setIsModalOpen(true);
                  setShowCreateGroup(false);
                }}
              >
                <FaArrowLeft />
              </div>

              <div className="text-xl font-semibold">New group</div>
            </div>

            {!showCreateGroup ? (
              <SearchBox
                id="GroupSearchBox"
                placeholder="Search"
                value={groupSearchTerm}
                onChange={(e) => setGroupSearchTerm(e.target.value)}
              />
            ) : (
              <div>
                <div className=" flex  items-center gap-2 my-2">
                  <UserProfilePic />
                  Add group icon (optional)
                </div>
                <input
                  type="text"
                  placeholder="Group name (optional)"
                  className="px-2.5 bg-[#303030] w-[90%] h-8 rounded-xl outline-none"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            )}

            {showNext && !showCreateGroup && (
              <div className="flex flex-row items-center my-2 gap-1">
                <div
                  className="bg-[#2ce987] py-1 flex-1 text-center rounded-md hover:cursor-pointer"
                  onClick={() => {
                    setShowCreateGroup(true);
                    setShowNext(false);
                  }}
                >
                  Next
                </div>
                <div
                  className="bg-[#3b3b3b] py-1 flex-1 text-center rounded-md hover:cursor-pointer"
                  onClick={cancel}
                >
                  Cancel
                </div>
              </div>
            )}

            {showCreateGroup && (
              <div className="flex flex-row items-center my-2 gap-1">
                <div
                  className="bg-[#2ce987] py-1 flex-1 text-center rounded-md hover:cursor-pointer"
                  onClick={async () => {
                    const res = await createGroup({ users: groupUsers });
                    setShowCreateGroup(false);
                    setIsModalOpen(false);
                    setIsValidChatId(true);
                    setIsGroupModalOpen(false);
                    setSelectedChat({ _id: res });
                    setProfileName(groupName || "Unknown");
                    setChats(new Map());
                  }}
                >
                  Create
                </div>
                <div
                  className="bg-[#3b3b3b] py-1 flex-1 text-center rounded-md hover:cursor-pointer"
                  onClick={cancel}
                >
                  Cancel
                </div>
              </div>
            )}

            {!showCreateGroup && (
              <ul className="relative space-y-1.5 max-h-96 overflow-auto">
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 rounded hover:bg-[#383838] cursor-pointer flex items-center justify-between"
                    onClick={() => toggleUser(user._id)}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserProfilePic size="36" />
                      <span>{user.name}</span>
                    </div>
                    {isUserSelected(user._id) ? (
                      <IoCheckboxOutline className="text-green-400 text-xl" />
                    ) : (
                      <IoSquareOutline className="text-gray-400 text-xl" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewGroupChatModal;
