const Product = require('../../db/models/store/productModel');
const Store = require('../../db/models/store/storeModel');
const Category = require('../../db/models/store/categoryModel');
const Tag = require('../../db/models/store/tagModel');

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

// Ensure a store exists and is active
async function requireActiveStore() {
  const store = await Store.findOne({ status: 'active' });
  if (!store) throw new Error('No active store exists.');
  return store;
}

// Create a product
async function createProduct(data) {
  const store = await requireActiveStore();
  // If only SKU is provided, allow draft creation
  if (data.sku && !data.name && !data.price && !data.category) {
    data.status = 'draft';
    data.store = store._id;
    // Use SKU as slug if not provided
    data.slug = data.sku.toLowerCase();
    const product = new Product(data);
    return await product.save();
  }
  // Existing logic for published/complete products
  if (!data.slug) data.slug = slugify(data.name);
  data.store = store._id;
  // Validate category and tags belong to this store
  const category = await Category.findOne({ _id: data.category, store: store._id });
  if (!category) throw new Error('Category not found or does not belong to this store.');
  if (data.tags && data.tags.length) {
    const tags = await Tag.find({ _id: { $in: data.tags }, store: store._id });
    if (tags.length !== data.tags.length) throw new Error('One or more tags not found or do not belong to this store.');
  }
  // Asset upload logic placeholder: data.images should be an array of URLs/paths
  const product = new Product(data);
  return await product.save();
}

// Get a single product by id
async function getProduct(id) {
  return await Product.findById(id)
    .populate('category')
    .populate('tags')
    .populate('store')
    .populate('vendor');
}

// Get all products for the current store
async function getProducts() {
  const store = await requireActiveStore();
  return await Product.find({ store: store._id })
    .populate('category')
    .populate('tags')
    .populate('vendor')
    .sort({ name: 1 });
}

// Update a product
async function updateProduct(id, data) {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');
  if (data.name && !data.slug) data.slug = slugify(data.name);
  // Validate category and tags if changed
  if (data.category) {
    const store = await requireActiveStore();
    const category = await Category.findOne({ _id: data.category, store: store._id });
    if (!category) throw new Error('Category not found or does not belong to this store.');
  }
  if (data.tags && data.tags.length) {
    const store = await requireActiveStore();
    const tags = await Tag.find({ _id: { $in: data.tags }, store: store._id });
    if (tags.length !== data.tags.length) throw new Error('One or more tags not found or do not belong to this store.');
  }
  Object.assign(product, data);
  return await product.save();
}

// Delete a product
async function deleteProduct(id) {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');
  await product.deleteOne();
  return { message: 'Product deleted' };
}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
