const router = require('express').Router();
const postController = require('../../controllers/postController');

router.route('/').post(postController.submitComment);

router.route('/:id').delete(postController.deleteComment);

module.exports = router;
