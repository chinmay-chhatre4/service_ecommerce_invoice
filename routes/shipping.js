const express = require("express");
const router = express.Router();
const {
  createShipping,
  getAllShippingRate,
  fetchShippingRateByCountryCode,
  deleteShippingRateByCountryCode,
} = require("../controllers/shipping");

// Route for creating a shipping rate
router.post("/add-shipping-rate", async (req, res, next) => {
  try {
    await createShipping(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Route for getting all shipping rates
router.get("/get-all-shipping-rates", async (req, res, next) => {
  try {
    await getAllShippingRate(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Route for fetching a shipping rate by country code
router.get("/fetch-shipping-by-code", async (req, res, next) => {
  try {
    await fetchShippingRateByCountryCode(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Route for deleting a shipping rate by country code
router.delete("/delete-shipping-by-code", async (req, res, next) => {
  try {
    await deleteShippingRateByCountryCode(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

module.exports = router;
