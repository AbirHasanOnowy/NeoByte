import express from "express";
import dotenv from "dotenv";
import SSLCommerzPayment from "sslcommerz-lts"; // Adjust the import path as necessary
import Order from "../models/orderModel.js"; // Adjust the import path as necessary
import asyncHandler from "../middleware/asyncHandler.js";
import {
  deleteOrder,
  markOrderAsPaid,
} from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWD;
const is_live = false; // Set to true for production
const routePath = "/api/config/payment"; // Adjust the route path as necessary
const router = express.Router();
dotenv.config();

function generateTranId() {
  const timeStamp = new Date().getTime().toString();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${timeStamp}${randomString}`;
}

const paymentProcessor = asyncHandler(async (req, res) => {
  try {
    // const order = req.body;
    const orderId = req.params.id; // Get orderId from query parameters
    // if (!orderId) {
    //   return res.status(400).json({ message: "Order ID is required" });
    // }
    // res.status(200).json(allOrders);

    const orderDetails = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    // res.status(200).json(orderDetails);
    if (!orderDetails) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Check if the order is already paid
    if (orderDetails.isPaid) {
      res.status(400);
      throw new Error("Order already paid");
    }
    // Check if the order is already delivered
    if (orderDetails.isDelivered) {
      res.status(400);
      throw new Error("Order already delivered");
    }

    const data = {
      total_amount: orderDetails.totalPrice,
      currency: "BDT",
      tran_id: generateTranId(), // use unique tran_id for each api call
      success_url: `${routePath}/success`,
      fail_url: `${routePath}/fail`,
      cancel_url: `${routePath}/cancel/${orderId}`,
      ipn_url: `${routePath}/ipn`,
      shipping_method: "Courier",
      product_name: "Unspecified",
      product_category: "Unspecified",
      product_profile: "general",
      cus_name: orderDetails.user.username,
      cus_email: orderDetails.user.email,
      cus_add1: "unspecified",
      cus_add2: "unspecified",
      cus_city: "unspecified",
      cus_state: "unspecified",
      cus_postcode: "unspecified",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      // res.redirect(GatewayPageURL);
      console.log("Redirecting to: ", GatewayPageURL);
      res.status(200).json({ url: GatewayPageURL });
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

router.put("/success", authenticateUser, markOrderAsPaid); // Mark order as paid on success

router.post("/fail", (req, res) => {
  console.log("Payment failed");
  res.status(400).json({ message: "Payment failed" });
});

router.delete("/cancel/:id", authenticateUser, deleteOrder); // Delete order on cancel

router.get("/ipn", (req, res) => {
  console.log("Redirect client to this URL for IPN");
  res.status(200).json({ message: "IPN URL" });
});

router.route("/:id").get(paymentProcessor);

export default router;
