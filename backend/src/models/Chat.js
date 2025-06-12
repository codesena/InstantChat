import { Schema, model } from "mongoose";
import mongoose from "mongoose";
// works for both group and single chat
const ChatSchema = new Schema(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
    admin: [{ type: mongoose.Types.ObjectId, ref: "User", default: null }],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, default: null },
    profileUrl: { type: String, default: null },
  },
  { timestamps: true }
);

const ChatModel = model("Chat", ChatSchema);
export { ChatModel };
