const StoreModel = require('../../db/models/store/storeModel');

// Replace with your actual DB logic
exports.getStore = async () => {
  // Fetch the first store from the database
  return await StoreModel.findOne();
};
