// app.js

// Load environment variables
require("dotenv").config();

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler"); // Import errorHandler middleware
const logger = require("./utils/logger");

// Routes
const productsRouter = require("./routes/products");
const shippingRouter = require("./routes/shipping");
const invoiceRouter = require("./routes/invoice");

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Custom CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes setup
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/shipping", shippingRouter);
app.use("/api/v1/invoice", invoiceRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Hi, I'm live");
});

// Error handling middleware
app.use(errorHandler); // Use the errorHandler middleware

// Server setup
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      // logger.info(`Server running on port ${PORT}`);
      logger.info(`Server started`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

startServer();
