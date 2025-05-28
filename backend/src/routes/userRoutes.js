import { Router } from "express";
import { UserModel } from "../models/User.js";

const userRouter = Router();
//this is the logic to search user with the keyword
// userRouter.get("/users", async (req, res) => {
//   try {
//     const keyword = req.query.search
//       ? {
//           $or: [
//             { name: { $regex: req.query.search, $options: "i" } },
//             { email: { $regex: req.query.search, $options: "i" } },
//           ],
//         }
//       : {}; // this is a filter gpt it u will understand
//     const response = await UserModel.find(keyword, "name _id");
//     // console.log(response);
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// });

userRouter.get("/users", async (req, res) => {
  try {
    const response = await UserModel.find({}, "name _id"); // it is returning all the users even when they dont have chat id
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch users with error:-" + error });
  }
});
export default userRouter;
