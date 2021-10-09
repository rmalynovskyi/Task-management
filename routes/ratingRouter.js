const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.create);
router.get('/byTaskIdAndUserId/', ratingController.getByTaskIdAndUserId);

module.exports = router;