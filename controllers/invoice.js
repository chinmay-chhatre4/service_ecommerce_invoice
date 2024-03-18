const Product = require("../models/product");
const Shipping = require("../models/shipping");
const {
  GST_RATE,
  SHOES_DISCOUNT,
  SHIPPING_DISCOUNT,
  SHOES,
  SHIRTS,
  TSHIRT,
  JACKET,
} = require("../utils/constant");

const calculateInvoice = async (req, res) => {
  try {
    const products = req.body.products;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: "Invalid request data",
      });
    }
    const invoice = await calculateInvoiceDetails(products);
    res.json({ invoice });
  } catch (error) {
    console.error("Error calculating invoice:", error);
    res.status(500).json({ error: "Failed to calculate invoice" });
  }
};

async function calculateInvoiceDetails(products) {
  let subtotal = 0;
  let shippingFee = 0;
  let GST = 0;
  let discount = 0;

  for (const product of products) {
    const dbProduct = await Product.findById(product.id).exec();
    if (!dbProduct) {
      throw new Error(`Product with ID ${product.id} not found`);
    }

    subtotal += dbProduct.price * product.quantity;

    const dbShipping = await Shipping.findOne({
      countryCode: product.shipping_from,
    });
    if (!dbShipping) {
      throw new Error(
        `Shipping rate not found for country ${product.shipping_from}`
      );
    }

    let weightInKG = extractWeightFromString(product.weight) || 0;
    shippingFee +=
      weightInKG * 1000 * (dbShipping.rate / 100) * product.quantity;
  }

  GST = subtotal * GST_RATE;

  // Apply discounts
  discount += applyShoesDiscount(products, subtotal);
  discount += applyTopsJacketDiscount(products, subtotal, shippingFee);
  discount += applyShippingDiscount(products, shippingFee);

  const total = subtotal + shippingFee + GST - discount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    shippingFee: parseFloat(shippingFee.toFixed(2)),
    GST: parseFloat(GST.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

function applyShoesDiscount(products, subtotal) {
  const shoesProduct = products.find(
    (product) => product.name.toLowerCase() === SHOES
  );
  return shoesProduct ? subtotal * SHOES_DISCOUNT : 0;
}

function applyTopsJacketDiscount(products, subtotal, shippingFee) {
  const topsCount = products.filter(
    (product) =>
      product.name.toLowerCase() === TSHIRT ||
      product.name.toLowerCase() === SHIRTS
  ).length;

  const hasTopProduct = products.some(
    (product) =>
      product.quantity >= 2 &&
      (product.name.toLowerCase() === TSHIRT ||
        product.name.toLowerCase() === SHIRTS)
  );

  const jacketCount = products.filter(
    (product) => product.name.toLowerCase() === JACKET
  ).length;

  if ((topsCount >= 2 || hasTopProduct) && jacketCount > 0) {
    const jacketProduct = products.find(
      (product) => product.name.toLowerCase() === JACKET
    );
    return jacketProduct ? jacketProduct.price / 2 : 0;
  }

  return 0;
}

function applyShippingDiscount(products, shippingFee) {
  const discountFlag = products.some((product) => product.quantity >= 2);
  return discountFlag ? Math.min(SHIPPING_DISCOUNT, shippingFee) : 0;
}

function extractWeightFromString(inputString) {
  const regex = /[-+]?\d*\.?\d+/g; // Regular expression to match float numbers
  const matches = inputString.match(regex);
  if (matches) {
    return parseFloat(matches[0]); // Parse matched string as float
  } else {
    return null; // Return null if no match found
  }
}

module.exports = {
  calculateInvoice,
};
