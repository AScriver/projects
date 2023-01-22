const router = require('express').Router();
const postController = require('../../controllers/postController');

router.route('/:id').get(postController.getPostsById);

module.exports = router;
