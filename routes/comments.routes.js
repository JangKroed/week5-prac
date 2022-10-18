const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authMiddleware');

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router
  .route('/:postId')
  .get(commentsController.getComment)
  .post(Auth, commentsController.createComment);

router
  .route('/:commentId')
  .put(Auth, commentsController.updateComment)
  .delete(Auth, commentsController.destroyComment);

module.exports = router;
