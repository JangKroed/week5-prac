const { Post, Like } = require('../models');
// 여기 많아지면 안됨 ?
class PostRepository {
  createPost = async (result) => {
    await Post.create(result);
  };

  getPost = async () => {
    const postsData = await Post.findAll({
      attributes: {
        exclude: ['content'],
      },
    });
    return postsData;
  };

  findByPost = async (postId) => {
    const post = await Post.findByPk(postId);

    return post;
  };

  updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    await Post.update(
      {
        title,
        content,
      },
      { where: { postId } }
    );
  };

  destroyPost = async (postId) => {
    await Post.destroy({
      where: {
        postId,
      },
    });
  };

  findByLike = async (postId, userId) => {
    const userDB = await Like.findOne({
      where: {
        postId,
        userId,
      },
    });

    return userDB;
  };

  likePosts = async (userId) => {
    const likePosts = await Like.findAll({
      where: { userId },
    });

    return likePosts;
  };

  getLikePosts = async (likeUserIds) => {
    const result = await Post.findAll({
      where: { postId: likeUserIds },
      attributes: {
        exclude: ['content'],
      },
    });

    return result;
  };

  createLike = async (postId, userId) => {
    await Like.create({
      postId,
      userId,
    });
    await Post.increment({ likes: 1 }, { where: { postId } });
  };

  destroyLike = async (postId, userId) => {
    await Like.destroy({
      where: { postId, userId },
    });
    await Post.increment({ likes: -1 }, { where: { postId } });
  };
}

module.exports = PostRepository;
