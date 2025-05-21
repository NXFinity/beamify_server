const Store = require('../../db/models/store/storeModel');

// Create the Beamify Store (singleton)
async function createStore(data) {
  const existing = await Store.findOne();
  if (existing) {
    throw new Error('A store already exists. Only one store is allowed.');
  }
  const store = new Store(data);
  return await store.save();
}

// Get the Beamify Store (singleton)
async function getStore() {
  return await Store.findOne();
}

// Update the Beamify Store (singleton)
async function updateStore(data) {
  const store = await Store.findOne();
  if (!store) throw new Error('No store exists to update.');
  Object.assign(store, data);
  return await store.save();
}

// Delete the Beamify Store (singleton)
async function deleteStore() {
  const store = await Store.findOne();
  if (!store) throw new Error('No store exists to delete.');
  await store.deleteOne();
  return { message: 'Store deleted' };
}

module.exports = {
  createStore,
  getStore,
  updateStore,
  deleteStore
};
