const Category = require('../../db/models/store/categoryModel');
const Store = require('../../db/models/store/storeModel');

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

// Create a category
async function createCategory(data) {
  const store = await requireActiveStore();
  if (!data.slug) data.slug = slugify(data.name);
  data.store = store._id;
  const category = new Category(data);
  return await category.save();
}

// Get a single category by id
async function getCategory(id) {
  return await Category.findById(id).populate('parent').populate('store');
}

// Get all categories for the current store
async function getCategories() {
  const store = await requireActiveStore();
  return await Category.find({ store: store._id }).populate('parent').sort({ name: 1 });
}

// Update a category
async function updateCategory(id, data) {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');
  if (data.name && !data.slug) data.slug = slugify(data.name);
  Object.assign(category, data);
  return await category.save();
}

// Delete a category
async function deleteCategory(id) {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');
  await category.deleteOne();
  return { message: 'Category deleted' };
}

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
