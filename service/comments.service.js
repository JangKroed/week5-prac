const CommentRepository = require('../repositories/Comments.repository');
const PostRepository = require('../repositories/posts.repository');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  createComment = async (req, res, next) => {
    const { comment } = req.body;

    // 게시글이 있는지 검증
    const { postId } = req.params;
    const posts = await this.postRepository.findByPost(postId);
    if (!posts) throw new Error('존재하지 않는 게시글입니다.');
    const { user } = res.locals;

    // repository로 보낼 데이터 가공
    const result = {
      postId,
      userId: user.userId,
      nickname: user.nickname,
      comment,
    };

    await this.commentRepository.createComment(result);

    return;
  };

  getComment = async (req, res) => {
    const { postId } = req.params;
    const posts = await this.postRepository.findByPost(postId);
    if (!posts) throw new Error('존재하지 않는 게시글입니다.');
    const comments = await this.commentRepository.getComment(postId);

    return comments;
  };

  getCommentId = async (commentId) => {
    const result = await this.commentRepository.getCommentId(commentId);

    return result;
  };

  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { user } = res.locals;
    const { comment } = req.body;

    // 존재하는 댓글인지 검증
    const getCommentId = await this.commentRepository.getCommentId(commentId);
    if (!getCommentId) throw new Error('존재하지 않는 댓글입니다.');

    // 댓글 작성자와 로그인된 유저의 ID를 검증
    if (user.userId !== getCommentId.userId)
      throw new Error('로그인된 사용자와 게시자가 다릅니다');

    await this.commentRepository.updateComment(commentId, comment);
  };

  destroyComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { user } = res.locals;
    const getCommentId = await this.commentRepository.getCommentId(commentId);

    if (!getCommentId) throw new Error('존재하지 않는 댓글입니다.');

    if (user.userId !== getCommentId.userId)
      throw new Error('로그인된 사용자와 게시자가 다릅니다');

    await this.commentRepository.destroyComment(commentId);
  };
}

module.exports = CommentService;
