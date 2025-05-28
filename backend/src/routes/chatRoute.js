import { Router } from "express";
import {
  sendChatMessage,
  // fetchUserChats,
  oneOnOneChat,
  fetchAllChatId,
  createGroup,
} from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const chatRouter = Router();

chatRouter.get("/access", oneOnOneChat);
chatRouter.post("/message", sendChatMessage);
chatRouter.get("/fetchallchatid", fetchAllChatId);
chatRouter.post("/creategroup", createGroup);

// chatRouter.get("/", fetchUserChats);

export default chatRouter;
