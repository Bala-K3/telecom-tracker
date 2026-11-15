const router = require('express').Router();
const controller = require('./device.controller');

router.post('/', controller.register);
router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/:id/connect/:nodeId', controller.connect);
router.post('/:id/disconnect', controller.disconnect);

module.exports = router;