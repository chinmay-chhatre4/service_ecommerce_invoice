const mongoose = require("mongoose");

// Define product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from input
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
    min: [0, "Price cannot be negative"], // Ensure price is non-negative
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 2.5,
    min: [0, "Rating cannot be negative"], // Ensure rating is non-negative
    max: [5, "Rating cannot be greater than 5"], // Limit rating to a maximum of 5
  },
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shipping_from: {
    type: String,
    required: true,
    enum: ["IN", "US", "CN"], // Limit shipping_from values to specific options
  },
  weight: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    enum: {
      values: ["Myntra", "Ajio", "PowerLook", "Amazon", "Flipkart", "Nykaa"],
      message: "{VALUE} not supported",
    },
  },
});

// Create and export Product model
module.exports = mongoose.model("Product", productSchema);
