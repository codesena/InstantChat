import { Router } from "express";
import { UserModel } from "../models/User.js";

const userRouter = Router();
userRouter.get("/users", async (req, res) => {
  try {
    const response = await UserModel.find({}, "name _id profileUrl"); // it is returning all the users even when they dont have chat id
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch users with error:-" + error });
  }
});

userRouter.get("/users/me", async (req, res) => {
  try {
    const user = await UserModel.findById(
      req.userId,
      "_id name email profileUrl"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); //
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch logged user details with error: " + error,
    });
  }
});

export default userRouter;
