const Shipping = require("../models/shipping");

const createShipping = async (req, res) => {
  try {
    const { rate, countryCode, currencyCode } = req.body;

    const shipping = new Shipping({
      rate,
      countryCode,
      currencyCode,
    });

    const savedShipping = await shipping.save();
    res.status(201).json({
      msg: "Successfully saved shipping entry",
      shipping: savedShipping,
    });
  } catch (error) {
    console.error("Error saving shipping entry:", error);
    res.status(500).json({ error: "Failed to save shipping entry" });
  }
};

const getAllShippingRate = async (req, res) => {
  try {
    const shippingDataList = await Shipping.find({});
    res.status(200).json({ shippingRates: shippingDataList });
  } catch (error) {
    console.error("Error fetching shipping rates:", error);
    res.status(500).json({ error: "Failed to fetch shipping rates" });
  }
};

const fetchShippingRateByCountryCode = async (req, res) => {
  try {
    const countryCode = req.body.countryCode;
    const shippingData = await Shipping.find({ countryCode });
    res.status(200).json({ shippingRates: shippingData });
  } catch (error) {
    console.error("Error fetching shipping rate by country code:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch shipping rate by country code" });
  }
};

const deleteShippingRateByCountryCode = async (req, res) => {
  try {
    const countryCode = req.body.countryCode;
    await Shipping.deleteOne({ countryCode });
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting shipping rate by country code:", error);
    res
      .status(500)
      .json({ error: "Failed to delete shipping rate by country code" });
  }
};

module.exports = {
  createShipping,
  getAllShippingRate,
  fetchShippingRateByCountryCode,
  deleteShippingRateByCountryCode,
};
