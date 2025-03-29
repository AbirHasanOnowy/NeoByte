import express from "express";
import {
  authenticateUser,
  authorizeUserAsAdmin,
} from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

//controllers
import {
  addProduct,
  updateProduct,
  removeProduct,
  getAllProducts,
  fetchProducts,
  getProductById,
  addProductReview,
  topProducts,
  latestProducts,
  filterProducts,
} from "../controllers/productController.js";
import { get } from "mongoose";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticateUser, authorizeUserAsAdmin, addProduct);

router.route("/allproducts").get(getAllProducts);
router.route("/:id/reviews").post(authenticateUser, checkId, addProductReview);
router.route("/top").get(topProducts);
router.route("/new").get(latestProducts);
router.route("/filtered-products").post(filterProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(authenticateUser, authorizeUserAsAdmin, updateProduct)
  .delete(authenticateUser, authorizeUserAsAdmin, removeProduct);

export default router;
