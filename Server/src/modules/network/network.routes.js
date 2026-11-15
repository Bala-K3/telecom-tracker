const router = require('express').Router();
const controller = require('./network.controller');

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/:id/connect/:otherId', controller.connect);

module.exports = router;