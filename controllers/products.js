const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, price, shipping_from, feature, weight } = req.body;

    const product = new Product({
      name,
      price,
      shipping_from,
      feature,
      weight,
    });

    const savedProduct = await product.save();
    res
      .status(201)
      .json({ msg: "Successfully saved product", product: savedProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 100;
    let skip = (page - 1) * limit;

    const productData = await Product.find({}).skip(skip).limit(limit);
    res.status(200).json({ products: productData, count: productData.length });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const fetchProductByName = async (req, res) => {
  try {
    const productName = req.body.name;
    const productData = await Product.find({ name: productName });
    res.status(200).json({ products: productData });
  } catch (error) {
    console.error("Error fetching product by name:", error);
    res.status(500).json({ error: "Failed to fetch product by name" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.body.productId;
    await Product.findByIdAndDelete(productId);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  fetchProductByName,
  deleteProductById,
};
