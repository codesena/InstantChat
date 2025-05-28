import api from "./api.jsx";

export const registerUser = async (formData) => {
  console.log("inside register Password: " + formData.password);
  const response = await api.post("/signup", formData);
  console.log(response);
  return response;
};

export const loginUser = async (formData) => {
  console.log("inside register Password: " + formData.password);
  const response = await api.post("/signin", formData);
  // console.log(response);
  return response;
};
