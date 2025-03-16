import express from "express";
import {
  createUser,
  userLogin,
  userLogout,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeUserAsAdmin,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/auth", userLogin);
router.post("/logout", userLogout);
router
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .put(authenticateUser, updateUserProfile);

//Admin Pannel
router
  .route("/")
  .post(createUser)
  .get(authenticateUser, authorizeUserAsAdmin, getAllUsers);
router
  .route("/:id")
  .delete(authenticateUser, authorizeUserAsAdmin, deleteUserById)
  .get(authenticateUser, authorizeUserAsAdmin, getUserById)
  .put(authenticateUser, authorizeUserAsAdmin, updateUserById);

export default router;
// This file is a route that handles requests to the /users endpoint.
