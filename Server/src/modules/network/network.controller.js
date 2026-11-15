const service = require('./network.service');

exports.create = async (req, res) => {
  const node = await service.createNode(req.body);
  res.status(201).json(node);
};

exports.list = async (req, res) => {
  res.json(await service.getNodes(req.query));
};

exports.getOne = async (req, res) => {
  res.json(await service.getNodeById(req.params.id));
};

exports.update = async (req, res) => {
  res.json(await service.updateNode(req.params.id, req.body));
};

exports.remove = async (req, res) => {
  await service.deleteNode(req.params.id);
  res.status(204).send();
};

exports.connect = async (req, res) => {
  res.json(await service.connectNodes(req.params.id, req.params.otherId));
};