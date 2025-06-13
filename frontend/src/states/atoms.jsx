import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUser",
  default: {
    userId: "",
    name: "",
    email: "",
    profileUrl: "",
  },
});

export const selectedProfileState = atom({
  key: "selectedProfile",
  default: {
    profileName: "",
    profileUrl: "",
    chatId: "",
  },
});

export const selectedUserIdState = atom({
  key: "selectedUserId",
  default: null,
});

export const isValidChatIdState = atom({
  key: "isValidChatId",
  default: false,
});

export const chatsState = atom({
  key: "chats",
  default: new Map(),
});

export const isModalOpenState = atom({
  key: "isModalOpen",
  default: false,
});

export const groupUsersState = atom({
  key: "groupUsers",
  default: [],
});

export const usersState = atom({
  key: "users",
  default: [],
});

export const allChatIdState = atom({
  key: "allChatId",
  default: null,
});

export const searchTermState = atom({
  key: "searchTerm",
  default: "",
});

export const isGroupModalOpenState = atom({
  key: "isGroupModalOpen",
  default: false,
});
