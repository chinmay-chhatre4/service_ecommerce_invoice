const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
  },
  countryCode: {
    type: String,
    required: [true, "Country Code must be provided"],
  },
  currencyCode: {
    type: String,
    required: [true, "Currency Code must be provided"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Shipping", shippingSchema);
