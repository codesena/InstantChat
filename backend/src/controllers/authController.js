import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";

const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const router = Router();

const SignUp = router.post("/signup", async (req, res) => {
  // all thing needs to be checked at frontend, to be correct using zod
  //email needs to be checked it shoud be unique
  // then db call to enter the data
  // password need to be hashed
  try {
    const { name, email, password, profileUrl } = req.body;
    console.log(name, email, password, profileUrl);
    const user = await UserModel.findOne({ email });
    // console.log(user);
    if (user) {
      res.status(400).json({
        message: "Email already exists!",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      profileUrl: profileUrl || "",
    });

    res.status(200).json({
      message: "User Created SuccesFully!",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

const Signin = router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // all thing needs to be checked at frontend, to be correct using zod
  //email needs to be checked it shoud be unique
  // then db call to enter the data
  // password need to be hashed
  console.log(email);
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User Not Found! SignUp First",
    });
    return;
  }

  const response = bcrypt.compareSync(password, user.password);

  if (response) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_USER);

    res.status(200).json({
      message: "Signin SuccesFully!",
      token: token,
    });
  } else {
    res.status(401).json({
      message: "Invalid Passwod!",
    });
    return;
  }
});

export { SignUp, Signin };
