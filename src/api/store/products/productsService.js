const ProductModel = require('../../../db/models/store/productModel');

// Replace with your actual DB logic
exports.getAllProducts = async () => {
  // Fetch all published products from the database
  return await ProductModel.find({ status: 'published' });
};

exports.getProductById = async (id) => {
  // Fetch a single published product by ID from the database
  return await ProductModel.findOne({ _id: id, status: 'published' });
};

exports.getProductBySku = async (sku) => {
  // Fetch a single published product by SKU from the database
  return await ProductModel.findOne({ sku, status: 'published' });
};
