import express from "express";
import "dotenv/config";
import cors from "cors";
import jwt from "jsonwebtoken";
import { ConnectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoute.js";
import { Server } from "socket.io";
import { createServer } from "http"; // we can remove the node: word
import { createChatId, storeMessage } from "./services/chatService.js";
import { ChatModel } from "./models/Chat.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
const userSocketMap = new Map(); // userId => socket.id
app.use(express.json());
app.use(cors());
ConnectDB();

app.use("/api/v1", authRouter);
app.use("/api/v1", authMiddleware, userRouter);
app.use("/api/v1", authMiddleware, chatRouter);

//Socket.io

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // or your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_USER); //
    socket.userId = user.userId; // Attach user data to socket
    userSocketMap.set(user.userId, socket.id);
    next();
  } catch (err) {
    console.log("token err inside socket");
    console.log(err.message);
    return next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  // console.log("a user connected with socket.id " + socket.id);
  // console.log("a user connected with userId: " + socket.userId);

  socket.on("disconnect", () => {
    userSocketMap.delete(socket.userId);
    // console.log("user disconnected with userId " + socket.userId);
  });

  socket.on("message", async (message) => {
    console.log("received message", message);
    let chatId, chatIdUsers;
    if (message?.chatId) {
      chatId = message.chatId;
    } else if (message?.receiverId) {
      const userId1 = socket.userId,
        userId2 = message.receiverId;
      chatId = await createChatId({ userId1, userId2 });
      console.log("chatId:", chatId);
    } else {
      socket.emit("errorMessage", {
        error: "Chat ID not found. Message not delivered.",
      });
      return;
    }

    chatIdUsers = await ChatModel.findById(chatId);
    const newMessage = {
      chatId: chatId,
      senderId: socket.userId,
      text: message.text,
    };

    const storedNewMessage = await storeMessage(newMessage); // stroing messages in the db
    console.log("stored message", storedNewMessage);

    chatIdUsers.latestMessage = storedNewMessage._id; // storing message id here for the latest message
    await chatIdUsers.save();
    console.log(chatIdUsers);
    // console.log(response + "from server.js");
    try {
      const _id = message._id;
      chatIdUsers.users
        .map((userId) => userId.toString()) // Convert all to string
        .filter((id) => userSocketMap.has(id)) // Keep only those with a socketId
        .forEach((id) => {
          const socketId = userSocketMap.get(id);
          io.to(socketId).emit("receiverMessage", { _id, storedNewMessage });
        });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
