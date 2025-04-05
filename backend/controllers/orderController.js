import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

//Utility Function
const calculateOrderPrices = (orderItems) => {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxPrice = (0.15 * itemsPrice).toFixed(2); // Assuming a tax rate of 15%
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping for orders over $100
  const totalPrice = (
    itemsPrice * 1 +
    taxPrice * 1 +
    shippingPrice * 1
  ).toFixed(2);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    taxPrice,
    shippingPrice,
    totalPrice,
  };
};

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((item) => item._id) },
    });

    const dbOrderItems = orderItems.map((item) => {
      const product = itemsFromDB.find((p) => p._id.toString() === item._id);

      if (!product) {
        res.status(400);
        throw new Error(`Product not found: ${item._id}`);
      }
      return {
        ...item,
        product: item._id,
        price: product.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calculateOrderPrices(dbOrderItems);

    const order = new Order({
      user: req.user._id,
      orderItems: dbOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const calculateTotalSales = asyncHandler(async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      // {
      //   $match: {
      //     isPaid: true,
      //   },
      // },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.status(200).json({ totalSales: totalSales[0].totalSales });
    // const orders = await Order.find({
    //   /*isPaid: true*/
    // });
    // const totalSales = orders.reduce(
    //   (acc, order) => acc + order.totalPrice,
    //   0
    // );
    // res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const calculateTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.status(200).json(salesByDate);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "id username email"
    );
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOneAndDelete(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.status(200).json({ message: "Order removed" });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error: " + error.message);
  }
});

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  deleteOrder,
};
