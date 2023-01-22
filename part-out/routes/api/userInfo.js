const router = require('express').Router();
const userController = require('../../controllers/userController');

// routes /api/user
router.route('/').get(userController.allUsers);

router
  .route('/:id')
  .get(userController.userInfo)
  .put(userController.updateUserStatus);

module.exports = router;
