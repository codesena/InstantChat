import api from "./api.jsx";

export const registerUser = async (formData) => {
  const response = await api.post("/signup", formData);
  return response;
};

export const loginUser = async (formData) => {
  const response = await api.post("/signin", formData);
  return response;
};
