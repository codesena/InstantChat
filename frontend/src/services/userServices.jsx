import api from "./api.jsx";
// default it will fetch all the users else will do search according to the searchtext provided

export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const fetchAllChatId = async () => {
  const res = await api.get("/fetchallchatid",);
  console.log(res)
  return res.data;
};

export const fetchParticularUsers = async (searchText = "") => {
  const res = await api.get(`/users?search=${searchText}`);
  return res.data;
};
