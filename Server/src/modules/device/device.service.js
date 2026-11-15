const repo = require('./device.repository');
const networkRepo = require('../network/network.repository');
const AppError = require('../../utils/AppError');

const ALLOWED_FIELDS = ['name', 'serialNumber', 'type'];

const pickAllowed = (body) =>
  Object.fromEntries(Object.entries(body).filter(([key]) => ALLOWED_FIELDS.includes(key)));

const registerDevice = async (body) => {
  const data = pickAllowed(body);
  if (data.serialNumber && (await repo.findBySerial(String(data.serialNumber)))) {
    throw new AppError('A device with this serial number already exists', 409);
  }
  return repo.create(data);
};

const getDevices = (query) => {
  const filter = {};
  if (query.status) filter.status = String(query.status);
  if (query.type) filter.type = String(query.type);
  if (query.node) filter.node = String(query.node);
  return repo.findAll(filter);
};

const getDeviceById = async (id) => {
  const device = await repo.findById(id);
  if (!device) throw new AppError('Device not found', 404);
  return device;
};

const updateDevice = async (id, body) => {
  const device = await repo.updateById(id, pickAllowed(body));
  if (!device) throw new AppError('Device not found', 404);
  return device;
};

const deleteDevice = async (id) => {
  const device = await repo.deleteById(id);
  if (!device) throw new AppError('Device not found', 404);
};

// The core business rule of this module
const connectDevice = async (deviceId, nodeId) => {
  const device = await getDeviceById(deviceId);

  const node = await networkRepo.findById(nodeId);
  if (!node) throw new AppError('Network node not found', 404);

  if (node.status !== 'ACTIVE') {
    throw new AppError(`Node ${node.code} is ${node.status} and cannot accept devices`, 409);
  }

  const alreadyThere = device.node && String(device.node._id) === String(node._id);
  if (!alreadyThere) {
    const current = await repo.countByNode(node._id);
    if (current >= node.capacity) {
      throw new AppError(`Node ${node.code} is at full capacity (${node.capacity})`, 409);
    }
  }

  return repo.updateById(deviceId, { node: node._id, status: 'ONLINE', lastSeenAt: new Date() });
};

const disconnectDevice = async (deviceId) => {
  await getDeviceById(deviceId);
  return repo.updateById(deviceId, { node: null, status: 'OFFLINE' });
};

module.exports = {
  registerDevice,
  getDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
  connectDevice,
  disconnectDevice,
};