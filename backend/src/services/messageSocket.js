import { MessageModel } from "../models/Message.js";

const handleSocketConnection = (io) => {
  io.on("connection", async (socket) => {
    console.log("A user connected inside messagesocket");

    // Send recent messages
    const messages = await MessageModel.find()
      .sort({ createdAt: 1 })
      .limit(100);
    socket.emit("chatHistory", messages);

    // When a message is sent
    socket.on("message", async (msgData) => {
      try {
        const message = new MessageModel({
          text: msgData.text,
          sender: msgData.senderId, // Ensure frontend sends this
          chatId: msgData.chatId, // You can add chat/group support
        });

        const saved = await message.save();
        io.emit("message", saved);
      } catch (err) {
        console.error(" Message save error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(" A user disconnected");
    });
  });
};

export default handleSocketConnection;
