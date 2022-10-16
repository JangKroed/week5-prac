const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authMiddleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router
  .route('/')
  .get(postsController.getPost)
  .post(Auth, postsController.createPost);

// router
//   .route('/like')
//   .get(postsController.getLikePost)
//   .put('/:postId', postsController.likePost);

router
  .route('/:postId')
  .get(postsController.findByPost)
  .put(Auth, postsController.updatePost)
  .delete(Auth, postsController.destroyPost);

module.exports = router;
