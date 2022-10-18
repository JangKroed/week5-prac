const CommentService = require('../service/comments.service');

class CommentsController {
  commentService = new CommentService();
  createComment = async (req, res, next) => {
    try {
      const { comment } = req.body;
      if (!comment) throw new Error('댓글 작성에 실패하였습니다.');

      await this.commentService.createComment(req, res);

      res.status(200).send({ message: '댓글 작성에 성공하였습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  getComment = async (req, res, next) => {
    try {
      const comments = await this.commentService.getComment(req, res);

      res.status(200).json({
        data: comments,
      });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  updateComment = async (req, res, next) => {
    try {
      await this.commentService.updateComment(req, res);

      res.status(200).send({
        message: '댓글이 수정되었습니다.',
      });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };

  destroyComment = async (req, res, next) => {
    try {
      await this.commentService.destroyComment(req, res);

      res.status(200).send({ message: '댓글이 삭제되었습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };
}

module.exports = CommentsController;
