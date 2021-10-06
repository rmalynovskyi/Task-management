const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const completeTaskRouter = require('./completeTaskRouter');

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/completeTasks', completeTaskRouter);

module.exports = router;