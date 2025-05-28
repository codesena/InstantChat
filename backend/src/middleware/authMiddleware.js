import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log("middleware-token->", token);
  if (!token) {
    res.json({
      msg: "token not Found!",
    });
    return;
  }
  const response = jwt.verify(token, process.env.JWT_SECRET_USER);
  try {
    req.userId = response.userId;
    next();
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};
