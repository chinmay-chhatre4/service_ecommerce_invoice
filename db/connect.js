const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    logger.info("Database connected");
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
