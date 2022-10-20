const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authMiddleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router
  .route('/')
  /**
   * GET - 게시글 전체목록을 작성일 기준 내림차순으로 불러옵니다.
   */
  .get(postsController.getPost)
  /**
   * POST - 게시글을 작성합니다.
   * 로그인이 되어있지 않으면 글을 쓰지 못합니다.
   */
  .post(Auth, postsController.createPost);

/**
 * 유저가 누른 좋아요 목록들을 불러옵니다.
 * 로그인이 되어있지 않으면 목록을 불러오지 못합니다.
 */
router.get('/like', Auth, postsController.getLikePost);

/**
 * 게시글에 좋아요를 누르면 게시글의 좋아요가 +1되고
 * 같은유저가 같은글에 한번 더 누르면 좋아요가 -1이 됩니다.
 * 로그인이 되어있지 않으면 누르지 못합니다.
 */
router.put('/:postId/like', Auth, postsController.toggleLike);

router
  .route('/:postId')
  /**
   * 하나의 게시글을 선택하면 내용을 볼수 있습니다.
   */
  .get(postsController.findByPost)
  /**
   * 게시글을 수정할 수 있습니다.
   * 작성한 게시자만이 수정이 가능하고,
   * 로그인이 되어있지 않으면 접근할 수 없습니다.
   */
  .put(Auth, postsController.updatePost)
  /**
   * 게시글을 삭제할 수 있습니다.
   * 작성한 게시자만이 삭제가 가능하고,
   * 로그인이 되어있지 않으면 접근할 수 없습니다.
   */
  .delete(Auth, postsController.destroyPost);

module.exports = router;
