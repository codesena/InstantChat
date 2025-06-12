import { ChatModel } from "../models/Chat.js";
import { MessageModel } from "../models/Message.js";

async function createChatId({ userId1, userId2 }) {
  return (await ChatModel.create({ users: [userId1, userId2] }))._id;
}

async function createGroupChatId({ users, admin, groupName, profileUrl }) {
  return await ChatModel.create({
    users,
    admin,
    groupName,
    profileUrl,
    isGroup: true,
  });
}

async function accessChatbyChatId({ chatId }) {
  return { chatId, chat: await MessageModel.find({ chatId }) };
}

const storeMessage = async ({ senderId, chatId, text, timestamp }) => {
  try {
    const response = await MessageModel.create({
      chatId: chatId,
      senderId: senderId,
      text: text,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserChats = async (userId) => {
  console.log(typeof userId);
  return await ChatModel.find({ users: userId })
    .populate("users")
    .populate("latestMessage");
};

const getAllChatId = async ({ userId }) => {
  try {
    const chats = await ChatModel.find({ users: userId })
      .select("_id isGroup groupName users latestMessage admin profileUrl ")
      .populate("users", "name _id profileUrl")
      .populate("latestMessage", "text");
    console.log("getallchatid", chats);

    const result = chats.map((chat) => {
      const {
        _id,
        isGroup,
        groupName,
        users,
        latestMessage,
        admin,
        profileUrl,
      } = chat;
      if (!isGroup) {
        let otherUser = users.find(
          (user) => user._id.toString() !== userId.toString()
        );
        if (users[0] === users[1]) otherUser = users[0];
        if (otherUser)
          return {
            _id,
            isGroup,
            name: otherUser.name,
            userId: otherUser._id,
            profileUrl: otherUser.profileUrl,
            text: latestMessage?.text,
          };
      }
      return {
        _id,
        isGroup,
        groupName,
        admin,
        users,
        profileUrl,
        text: latestMessage?.text,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

export {
  createChatId,
  storeMessage,
  getUserChats,
  getAllChatId,
  accessChatbyChatId,
  createGroupChatId,
};
