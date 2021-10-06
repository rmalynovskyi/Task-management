const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAll);
router.get('/byUser', taskController.getAllByUserId);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;