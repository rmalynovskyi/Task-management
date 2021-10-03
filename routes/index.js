const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;