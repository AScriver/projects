const router = require('express').Router();
const passport = require('../../config/passport');
const userController = require('../../controllers/userController');

router.post('/', passport.authenticate('local'), userController.userLogin);

module.exports = router;
