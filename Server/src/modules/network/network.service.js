const repo = require('./network.repository');
const AppError = require('../../utils/AppError');

const ALLOWED_FIELDS = ['name', 'code', 'type', 'city', 'capacity', 'status'];

// Only copy fields we allow, so clients can't set anything else (mass assignment)
const pickAllowed = (body) =>
  Object.fromEntries(Object.entries(body).filter(([key]) => ALLOWED_FIELDS.includes(key)));

const createNode = async (body) => {
  const data = pickAllowed(body);
  if (data.code && (await repo.findByCode(String(data.code)))) {
    throw new AppError('A node with this code already exists', 409);
  }
  return repo.create(data);
};

const getNodes = (query) => {
  const filter = {};
  if (query.type) filter.type = String(query.type);
  if (query.status) filter.status = String(query.status);
  return repo.findAll(filter);
};

const getNodeById = async (id) => {
  const node = await repo.findById(id);
  if (!node) throw new AppError('Network node not found', 404);
  return node;
};

const updateNode = async (id, body) => {
  const node = await repo.updateById(id, pickAllowed(body));
  if (!node) throw new AppError('Network node not found', 404);
  return node;
};

const deleteNode = async (id) => {
  const node = await repo.deleteById(id);
  if (!node) throw new AppError('Network node not found', 404);
};

const connectNodes = async (id, otherId) => {
  if (id === otherId) throw new AppError('A node cannot connect to itself', 400);
  await getNodeById(id);      // both must exist
  await getNodeById(otherId);
  await repo.addConnection(id, otherId);
  await repo.addConnection(otherId, id); // links work in both directions
  return getNodeById(id);
};

module.exports = { createNode, getNodes, getNodeById, updateNode, deleteNode, connectNodes };