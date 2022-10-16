const { Post } = require('../models');
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
}

module.exports = PostRepository;
