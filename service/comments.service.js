const CommentRepository = require('../repositories/Comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (req, res, next) => {
    try {
      const { comment } = req.body;
      const { postId } = req.params;
      const { user } = res.locals;
      const result = {
        postId,
        userId: user.userId,
        nickname: user.nickname,
        comment,
      };

      await this.commentRepository.createComment(result);

      return;
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getComment = async (req, res) => {
    const { postId } = req.params;

    const comments = await this.commentRepository.getComment(postId);

    return comments;
  };

  getCommentId = async (commentId) => {
    const result = await this.commentRepository.getCommentId(commentId);

    return result;
  };

  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;

      await this.commentRepository.updateComment(commentId, comment);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  destroyComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;

      await this.commentRepository.destroyComment(commentId);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
}

module.exports = CommentService;
