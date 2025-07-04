import {
  accessChatbyChatId,
  createGroupChatId,
  getAllChatId,
  storeMessage,
} from "../services/chatService.js";

async function oneOnOneChat(req, res) {
  const { chatId } = req.query;
  try {
    const chat = await accessChatbyChatId({ chatId });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Could not access chat" });
  }
}

async function sendChatMessage(req, res) {
  try {
    const { senderId, chatId, message } = req.body;
    const response = await storeMessage({ senderId, chatId, message });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error inside sendChatMessage");
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
async function fetchAllChatId(req, res) {
  try {
    const userId = req.userId;
    const allchatid = await getAllChatId({ userId });
    console.log(userId, allchatid);
    res.status(200).json(allchatid);
  } catch (error) {
    res.status(500).json({ "Could not fetch chats": error });
  }
}

async function createGroup(req, res) {
  try {
    let { users, groupName, profileUrl } = req.body;
    const admin = req.userId;
    console.log("hi", users, groupName, profileUrl);

    users.push(admin);
    if (!groupName) groupName = "Unknown";
    const response = await createGroupChatId({
      users,
      admin,
      groupName,
      profileUrl,
    });
    res.status(200).json(response._id);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Could not fetch chats" });
  }
}
export { oneOnOneChat, sendChatMessage, fetchAllChatId, createGroup };
