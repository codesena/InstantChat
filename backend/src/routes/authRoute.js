import { Signin, SignUp } from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/signin", Signin);

export default authRouter;
