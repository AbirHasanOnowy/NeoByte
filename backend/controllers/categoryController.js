import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    // console.log(name);
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name }).save();
    return res.status(201).json({ name });
  } catch (error) {
    return res.status(500).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findById({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    category.name = name;
    const updatedCategoty = await category.save();
    return res.status(200).json(updatedCategoty);
  } catch (error) {
    return res.status(500).json(error);
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json(error);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
