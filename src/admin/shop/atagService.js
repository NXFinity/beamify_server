const Tag = require('../../db/models/store/tagModel');
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

// Create a tag
async function createTag(data) {
  const store = await requireActiveStore();
  if (!data.slug) data.slug = slugify(data.name);
  data.store = store._id;
  const tag = new Tag(data);
  return await tag.save();
}

// Get a single tag by id
async function getTag(id) {
  return await Tag.findById(id).populate('store');
}

// Get all tags for the current store
async function getTags() {
  const store = await requireActiveStore();
  return await Tag.find({ store: store._id }).sort({ name: 1 });
}

// Update a tag
async function updateTag(id, data) {
  const tag = await Tag.findById(id);
  if (!tag) throw new Error('Tag not found');
  if (data.name && !data.slug) data.slug = slugify(data.name);
  Object.assign(tag, data);
  return await tag.save();
}

// Delete a tag
async function deleteTag(id) {
  const tag = await Tag.findById(id);
  if (!tag) throw new Error('Tag not found');
  await tag.deleteOne();
  return { message: 'Tag deleted' };
}

module.exports = {
  createTag,
  getTag,
  getTags,
  updateTag,
  deleteTag
};
