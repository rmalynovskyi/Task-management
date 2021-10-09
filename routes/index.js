const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const completeTaskRouter = require('./completeTaskRouter');
const ratingRouter = require('./ratingRouter');

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/completeTasks', completeTaskRouter);
router.use('/ratings', ratingRouter);

module.exports = router;