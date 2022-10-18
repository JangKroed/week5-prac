const PostService = require('../service/posts.service');

class PostsController {
  postService = new PostService();

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) throw new Error('게시글 작성에 실패하였습니다.');

      await this.postService.createPost(req, res);
      res.status(200).send({ message: '게시글 작성에 성공하였습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  getPost = async (req, res, next) => {
    try {
      const posts = await this.postService.getPost();

      res.status(200).json({
        data: posts,
      });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
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
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { title, content } = req.body;

      if (!title) throw new Error('제목을 입력해주세요.');
      if (!content) throw new Error('내용을 입력해주세요.');

      await this.postService.updatePost(req, res);

      res.status(200).send({
        message: '게시글이 수정되었습니다.',
      });
    } catch (error) {
      res.status(error.status || 400);
      res.send({ message: error.message });
    }
  };

  destroyPost = async (req, res, next) => {
    try {
      // controller가 검증할 데이터가 없으므로 service로 정보를 그대로 전달
      await this.postService.destroyPost(req, res);

      res.status(200).send({
        message: '게시글이 삭제되었습니다.',
      });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  toggleLike = async (req, res, next) => {
    try {
      await this.postService.toggleLike(req, res);
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  getLikePost = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const userId = user.userId;

      const likePosts = await this.postService.likePosts(userId);

      res.status(200).json({ data: likePosts });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };
}

module.exports = PostsController;
