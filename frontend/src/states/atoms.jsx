import { atom } from "recoil";

// const [profileName, setProfileName] = useState("");
// const [selectedUserId, setSelectedUserId] = useState(null);
// const [selectedChat, setSelectedChat] = useState(null);
// const [isValidChatId, setIsValidChatId] = useState(false);
// const [chats, setChats] = useState(new Map());
// const [isModalOpen, setIsModalOpen] = useState(false);

export const profileNameState = atom({
  key: "profileName",
  default: "",
});

export const selectedUserIdState = atom({
  key: "selectedUserId",
  default: null,
});

export const selectedChatState = atom({
  key: "selectedChat",
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
