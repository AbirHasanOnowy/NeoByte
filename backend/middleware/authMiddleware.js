import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
import asyncHandler from "./asyncHandler.js";

const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized User. Please login first");
    }
  } else {
    res.status(401);
    throw new Error("Token missing. Please login first");
  }
});

const authorizeUserAsAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "User not Admin" });
  }
});

export { authenticateUser, authorizeUserAsAdmin };
