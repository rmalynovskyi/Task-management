const Router = require('express');
const router = new Router();
const completeTaskController = require('../controllers/completeTaskController');

router.post('/', completeTaskController.create);
router.get('/', completeTaskController.getByTaskIdAndUserId);
router.delete('/:id', completeTaskController.delete);

module.exports = router;