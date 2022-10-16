const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { user } = res.locals;
      const result = {
        userId: user.userId,
        nickname: user.nickname,
        title,
        content,
        likes: 0,
      };

      await this.postRepository.createPost(result);

      return;
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getPost = async () => {
    try {
      const postsData = await this.postRepository.getPost();

      return postsData;
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  findByPost = async (postId) => {
    const post = await this.postRepository.findByPost(postId);

    return post;
  };

  updatePost = async (req, res) => {
    try {
      await this.postRepository.updatePost(req, res);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  destroyPost = async (req, res) => {
    try {
      const { postId } = req.params;
      await this.postRepository.destroyPost(postId);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
}

module.exports = PostService;
