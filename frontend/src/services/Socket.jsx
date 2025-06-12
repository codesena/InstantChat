import { io } from "socket.io-client";

const socket = io("https://instantchat-1-s5vq.onrender.com", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;
