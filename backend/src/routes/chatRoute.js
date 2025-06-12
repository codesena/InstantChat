import { Router } from "express";
import {
  sendChatMessage,
  oneOnOneChat,
  fetchAllChatId,
  createGroup,
} from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.get("/access", oneOnOneChat);
chatRouter.post("/message", sendChatMessage);
chatRouter.get("/fetchallchatid", fetchAllChatId);
chatRouter.post("/creategroup", createGroup);

export default chatRouter;
