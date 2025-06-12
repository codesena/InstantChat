// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://instantchat-1-s5vq.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

export default api;
