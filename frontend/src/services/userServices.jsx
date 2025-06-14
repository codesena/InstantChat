import api from "./api.jsx";

export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const fetchAllChatId = async () => {
  const res = await api.get("/fetchallchatid");
  return res.data;
};

export const fetchParticularUsers = async (searchText = "") => {
  const res = await api.get(`/users?search=${searchText}`);
  return res.data;
};

export const loggedInUserDetails = async () => {
  const res = await api.get("users/me");
  return res.data;
};
