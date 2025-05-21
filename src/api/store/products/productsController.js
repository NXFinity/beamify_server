const productsService = require('./productsService');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductBySku = async (req, res) => {
  try {
    const product = await productsService.getProductBySku(req.params.sku);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
