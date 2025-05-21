const storeService = require('./storeService');

exports.getStorePublic = async (req, res) => {
  try {
    const store = await storeService.getStore();
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
