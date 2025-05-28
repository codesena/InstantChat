import mongoose, { model, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    senderId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    chatId: { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
    seenBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const MessageModel = model("Message", MessageSchema);
export { MessageModel };
