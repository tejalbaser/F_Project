// routes/products.js
const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router();

// Fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a new product
router.post("/products", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});
  

module.exports = router;
