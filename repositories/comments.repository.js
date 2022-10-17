const { Comment } = require('../models');

class CommentRepository {
  createComment = async (result) => {
    await Comment.create(result);
  };

  getComment = async (postId) => {
    const comments = await Comment.findAll({
      where: {
        postId,
      },
      order: [['createdAt', 'desc']],
    });

    return comments;
  };

  getCommentId = async (commentId) => {
    const result = await Comment.findByPk(commentId);

    return result;
  };

  updateComment = async (commentId, comment) => {
    await Comment.update({ comment }, { where: { commentId } });
  };

  destroyComment = async (commentId) => {
    await Comment.destroy({
      where: {
        commentId,
      },
    });
  };
}

module.exports = CommentRepository;
