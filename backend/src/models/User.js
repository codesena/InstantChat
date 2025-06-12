import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    profileUrl: { type: String },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);
export { UserModel };
