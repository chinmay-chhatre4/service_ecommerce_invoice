const express = require("express");
const router = express.Router();
const { calculateInvoice } = require("../controllers/invoice");

// Route for generating invoice
router.post("/generate-invoice", async (req, res, next) => {
  try {
    const invoiceData = await calculateInvoice(req, res);
    res.status(200).json(invoiceData);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

module.exports = router;
