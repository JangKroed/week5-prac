const PostService = require('../service/posts.service');

class PostsController {
  postService = new PostService();

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) throw new Error('게시글 작성에 실패하였습니다.');

      await this.postService.createPost(req, res);
      res.status(200).json({ message: '게시글 작성에 성공하였습니다.' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getPost = async (req, res, next) => {
    try {
      const posts = await this.postService.getPost();

      res.status(200).json({
        data: posts,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  findByPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findByPost(postId);
      res.status(200).json({
        data: post,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { user } = res.locals;
      const userId = await this.postService.findByPost(postId);

      if (!title || !content || !userId)
        throw new Error('게시글 수정에 실패하였습니다.');
      if (user.userId !== userId.userId)
        throw new Error('로그인된 사용자와 게시자가 다릅니다.');

      await this.postService.updatePost(req, res);

      res.status(200).send({
        message: '게시글이 수정되었습니다.',
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  destroyPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { user } = res.locals;
      const userId = await this.postService.findByPost(postId);

      if (!userId) throw new Error('게시글 삭제에 실패하였습니다.');
      if (user.userId !== userId.userId)
        throw new Error('로그인된 사용자와 게시자가 다릅니다.');

      await this.postService.destroyPost(req, res);

      res.status(200).send({
        message: '게시글이 삭제되었습니다.',
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
}

module.exports = PostsController;
