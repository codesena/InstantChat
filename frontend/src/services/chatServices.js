import api from "./api.jsx";

export const fetchChatsbyId = async ({ chatId }) => {
  const res = await api.get(`/access`, {
    params: { chatId },
  });
  return res.data;
};

export const GroupCreation = async ({ users, groupName }) => {
  const res = await api.post("/creategroup", {
    users: users,
    groupName: groupName,
  });
  console.log(res);

  return res.data;
};
