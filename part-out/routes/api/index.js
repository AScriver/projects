const router = require('express').Router();
const userSignup = require('./userSignup');
const userLogin = require('./userLogin');
const postRoutes = require('./postRoutes');
const userInfo = require('./userInfo');
const itemRoute = require('./itemRoute');
const commentRoute = require('./commentRoute');

// Uses /api/...
router.use('/signup', userSignup);
router.use('/post', postRoutes);
router.use('/login', userLogin);
router.use('/user', userInfo);
router.use('/item', itemRoute);
router.use('/comments', commentRoute);

//dispatch signin and post this user information
// https://stackoverflow.com/questions/44107665/how-to-access-a-browser-cookie-in-a-react-app

module.exports = router;
