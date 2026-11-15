const service = require('./device.service');

exports.register = async (req, res) => {
  res.status(201).json(await service.registerDevice(req.body));
};

exports.list = async (req, res) => {
  res.json(await service.getDevices(req.query));
};

exports.getOne = async (req, res) => {
  res.json(await service.getDeviceById(req.params.id));
};

exports.update = async (req, res) => {
  res.json(await service.updateDevice(req.params.id, req.body));
};

exports.remove = async (req, res) => {
  await service.deleteDevice(req.params.id);
  res.status(204).send();
};

exports.connect = async (req, res) => {
  res.json(await service.connectDevice(req.params.id, req.params.nodeId));
};

exports.disconnect = async (req, res) => {
  res.json(await service.disconnectDevice(req.params.id));
};