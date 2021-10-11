const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');

router.get('/new', taskController.getAllLastAdded);
router.get('/higher', taskController.getAllHigherRating);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;