import express from "express";
import {
  authenticateUser,
  authorizeUserAsAdmin,
} from "../middleware/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.route("/").post(authenticateUser, authorizeUserAsAdmin, createCategory);
router
  .route("/:categoryId")
  .get(readCategory)
  .put(authenticateUser, authorizeUserAsAdmin, updateCategory)
  .delete(authenticateUser, authorizeUserAsAdmin, removeCategory);
router.route("/categories").get(listCategory);

export default router;
