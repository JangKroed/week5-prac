const PostRepository = require('../repositories/posts.repository');
const { post } = require('../routes');

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

  findByLike = async (postId, userId) => {
    const userDB = await this.postRepository.findByLike(postId, userId);

    return userDB;
  };

  likePosts = async (userId) => {
    // 유저가 누른 좋아요테이블 리스트
    const likePosts = await this.postRepository.likePosts(userId);
    // 유저가 누른 좋아요 테이블의 userId 배열
    const likeUserIds = likePosts.map((like) => like.postId);
    const result = await this.postRepository.getLikePosts(likeUserIds);

    return result;
  };

  createLike = async (postId, userId) => {
    await this.postRepository.createLike(postId, userId);
  };

  destroyLike = async (postId, userId) => {
    await this.postRepository.destroyLike(postId, userId);
  };
}

module.exports = PostService;
