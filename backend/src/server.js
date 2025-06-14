import express from "express";
import "dotenv/config";
import cors from "cors";
import jwt from "jsonwebtoken";
import { ConnectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoute.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { createChatId, storeMessage } from "./services/chatService.js";
import { ChatModel } from "./models/Chat.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
const userSocketMap = new Map();

app.use(express.json());
app.use(cors());
ConnectDB();

app.use("/api/v1", authRouter);
app.use("/api/v1", authMiddleware, userRouter);
app.use("/api/v1", authMiddleware, chatRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_USER);
    socket.userId = user.userId;
    if (!userSocketMap.has(user.userId)) {
      userSocketMap.set(user.userId, new Set());
    }
    userSocketMap.get(user.userId).add(socket.id);
    next();
  } catch (err) {
    return next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const sockets = userSocketMap.get(socket.userId);
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        userSocketMap.delete(socket.userId);
      }
    }
  });

  socket.on("message", async (message) => {
    let chatId;
    if (message?.chatId) {
      chatId = message.chatId;
    } else if (message?.receiverId) {
      const userId1 = socket.userId,
        userId2 = message.receiverId;
      chatId = await createChatId({ userId1, userId2 });
    } else {
      socket.emit("errorMessage", {
        error: "Chat ID not found. Message not delivered.",
      });
      return;
    }

    const chat = await ChatModel.findById(chatId);
    const newMessage = {
      chatId: chatId,
      senderId: socket.userId,
      text: message.text,
    };

    const storedNewMessage = await storeMessage(newMessage);
    chat.latestMessage = storedNewMessage._id;
    await chat.save();

    const _id = message._id;
    chat.users
      .map((userId) => userId.toString())
      .forEach((userId) => {
        const socketSet = userSocketMap.get(userId);
        if (socketSet) {
          socketSet.forEach((sid) => {
            io.to(sid).emit("receiverMessage", { _id, storedNewMessage });
          });
        }
      });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
