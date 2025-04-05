import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";
import {
  authenticateUser,
  authorizeUserAsAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizeUserAsAdmin, getAllOrders);

router.route("/mine").get(authenticateUser, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticateUser, findOrderById);
router.route("/:id/pay").put(authenticateUser, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticateUser, authorizeUserAsAdmin, markOrderAsDelivered);

export default router;
