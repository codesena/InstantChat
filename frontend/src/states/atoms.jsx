import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUserAtom",
  default: {
    userId: "",
    name: "",
    email: "",
    profileUrl: "",
  },
});

export const selectedProfileState = atom({
  key: "selectedProfileAtom",
  default: {
    profileName: "",
    profileUrl: "",
    chatId: "",
  },
});

export const selectedUserIdState = atom({
  key: "selectedUserIdAtom",
  default: null,
});

export const isValidChatIdState = atom({
  key: "isValidChatIdAtom",
  default: false,
});

export const chatsState = atom({
  key: "chatsAtom",
  default: new Map(),
});

export const isModalOpenState = atom({
  key: "isModalOpenAtom",
  default: false,
});

export const groupUsersState = atom({
  key: "groupUsersAtom",
  default: [],
});

export const usersState = atom({
  key: "usersAtom",
  default: [],
});

export const allChatIdState = atom({
  key: "allChatIdAtom",
  default: [],
});

export const searchTermState = atom({
  key: "searchTermAtom",
  default: "",
});

export const isGroupModalOpenState = atom({
  key: "isGroupModalOpenAtom",
  default: false,
});

export const tokenState = atom({
  key: "tokenAtom",
  default: "",
});

export const tokenLoadedState = atom({
  key: "tokenLoadedAtom",
  default: false,
});

export const openSettingState = atom({
  key: "openSettingAtom",
  default: false,
});

export const openProfileState = atom({
  key: "openProfileAtom",
  default: false,
});

export const openMobileSettingModalState = atom({
  key: "openMobileSettingModalAtom",
  default: false,
});
