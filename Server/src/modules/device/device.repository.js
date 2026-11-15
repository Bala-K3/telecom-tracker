const Device = require('./device.model');

const create = (data) => Device.create(data);

const findAll = (filter = {}) =>
  Device.find(filter).populate('node', 'name code status').sort({ createdAt: -1 });

const findById = (id) => Device.findById(id).populate('node', 'name code status capacity');

const findBySerial = (serialNumber) =>
  Device.findOne({ serialNumber: serialNumber.toUpperCase() });

const countByNode = (nodeId) => Device.countDocuments({ node: nodeId });

const updateById = (id, data) =>
  Device.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => Device.findByIdAndDelete(id);

module.exports = { create, findAll, findById, findBySerial, countByNode, updateById, deleteById };