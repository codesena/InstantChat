import mongoose, { model, Schema } from "mongoose";

const GroupChatSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  latestmessage: { type: mongoose.Types.ObjectId, ref: "Message" },
  admin: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
});
const GroupChatModel = model("GroupChat", GroupChatSchema);
export { GroupChatModel };
