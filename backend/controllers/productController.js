import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import formidable from "formidable";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const form = formidable({});
    form.keepExtensions = true;

    // console.log(req.fields.name[0]);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          message: "Image could not be uploaded",
        });
      }

      switch (true) {
        case !fields.name:
          return res.status(400).json({ message: "Name is required" });
        case !fields.image:
          return res.status(400).json({ message: "Image is required" });
        case !fields.description:
          return res.status(400).json({ message: "Description is required" });
        case !fields.price:
          return res.status(400).json({ message: "Price is required" });
        case !fields.category:
          return res.status(400).json({ message: "Category is required" });
        case !fields.quantity:
          return res.status(400).json({ message: "Quantity is required" });
        case !fields.brand:
          return res.status(400).json({ message: "Brand is required" });
        case !fields.countInStock:
          return res.status(400).json({ message: "CountInStock is required" });
      }

      const name = fields.name[0];
      const image = fields.image[0];
      const description = fields.description[0];
      const price = parseInt(fields.price[0]);
      const category = fields.category[0];
      const quantity = parseInt(fields.quantity[0]);
      const brand = fields.brand[0];
      const countInStock = parseInt(fields.countInStock[0]);

      const product = new Product({
        name,
        image,
        brand,
        quantity,
        category,
        description,
        price,
        countInStock,
      });

      await product.save();
      res.status(201).json(product);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const form = formidable();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          message: "Image could not be uploaded",
        });
      }

      switch (true) {
        case !fields.name:
          return res.status(400).json({ message: "Name is required" });
        // throw new Error("Name is required");
        case !fields.image:
          return res.status(400).json({ message: "Image is required" });
        // throw new Error("Image is required");
        case !fields.description:
          return res.status(400).json({ message: "Description is required" });
        case !fields.price:
          return res.status(400).json({ message: "Price is required" });
        case !fields.category:
          return res.status(400).json({ message: "Category is required" });
        case !fields.quantity:
          return res.status(400).json({ message: "Quantity is required" });
        case !fields.brand:
          return res.status(400).json({ message: "Brand is required" });
        case !fields.countInStock:
          return res.status(400).json({ message: "CountInStock is required" });
      }

      const name = fields.name[0];
      const image = fields.image[0];
      const description = fields.description[0];
      const price = parseInt(fields.price[0]);
      const category = fields.category[0];
      const quantity = parseInt(fields.quantity[0]);
      const brand = fields.brand[0];
      const countInStock = parseInt(fields.countInStock[0]);

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          image,
          description,
          price,
          category,
          quantity,
          brand,
          countInStock,
        },
        { new: true }
      );

      await product.save();
      res.status(201).json(product);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 12;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length || 0;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const topProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const latestProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: 1 }).limit(5);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length > 0) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export {
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
};
