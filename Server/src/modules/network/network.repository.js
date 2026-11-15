const NetworkNode = require('./network.model');

const create = (data) => NetworkNode.create(data);

const findAll = (filter = {}) => NetworkNode.find(filter).sort({ createdAt: -1 });

const findById = (id) => NetworkNode.findById(id).populate('connectedTo', 'name code type status');

const findByCode = (code) => NetworkNode.findOne({ code: code.toUpperCase() });

const updateById = (id, data) =>
  NetworkNode.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => NetworkNode.findByIdAndDelete(id);

const addConnection = (id, otherId) =>
  NetworkNode.findByIdAndUpdate(id, { $addToSet: { connectedTo: otherId } }, { new: true });

module.exports = { create, findAll, findById, findByCode, updateById, deleteById, addConnection };