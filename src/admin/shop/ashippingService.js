const ShippingClass = require('../../db/models/store/shippingClassModel');

exports.getAllShippingClasses = async () => {
  return await ShippingClass.find();
};

exports.getShippingClassById = async (id) => {
  return await ShippingClass.findById(id);
};

exports.createShippingClass = async (data) => {
  const shippingClass = new ShippingClass(data);
  return await shippingClass.save();
};

exports.updateShippingClass = async (id, data) => {
  return await ShippingClass.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteShippingClass = async (id) => {
  return await ShippingClass.findByIdAndDelete(id);
};
