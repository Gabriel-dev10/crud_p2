const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/')
  .get(userController.getAll)
  .post(userController.create);

router.route('/:id')
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
