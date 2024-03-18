const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  fetchProductByName,
  deleteProductById,
} = require("../controllers/products");

// Route for creating a product
router.post("/add-product", async (req, res, next) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Route for getting all products
router.get("/get-all-products", async (req, res, next) => {
  try {
    await getAllProducts(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Route for fetching a product by name
router.get("/fetch-product", async (req, res, next) => {
  try {
    await fetchProductByName(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Route for deleting a product by ID
router.delete("/delete-product", async (req, res, next) => {
  try {
    await deleteProductById(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

module.exports = router;
