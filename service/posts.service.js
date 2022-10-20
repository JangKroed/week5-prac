const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  createPost = async (req, res, next) => {
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
  };

  getPost = async () => {
    const postsData = await this.postRepository.getPost();

    return postsData;
  };

  findByPost = async (postId) => {
    const post = await this.postRepository.findByPost(postId);

    return post;
  };

  updatePost = async (req, res) => {
    const { postId } = req.params;
    const { user } = res.locals;

    // 존재하는 게시글인지 repository에서 찾아온다
    const findPost = await this.postRepository.findByPost(postId);
    if (!findPost) throw new Error('존재하지 않는 게시글입니다.');

    // 게시한 유저와 로그인한 유저가 일치하는지 검증
    if (user.userId !== findPost.userId)
      throw new Error('로그인된 사용자와 게시자가 다릅니다.');

    // repository로 보낼 데이터 가공
    const { title, content } = req.body;
    await this.postRepository.updatePost(title, content, postId);
  };

  destroyPost = async (req, res) => {
    const { postId } = req.params;
    const { user } = res.locals;
    const findPost = await this.postRepository.findByPost(postId);

    if (!findPost) throw new Error('존재하지 않는 게시글입니다.');
    if (user.userId !== findPost.userId)
      throw new Error('로그인된 사용자와 게시자가 다릅니다.');

    await this.postRepository.destroyPost(postId);
  };

  toggleLike = async (req, res) => {
    // 좋아요를 하려는 게시글
    const { postId } = req.params;

    // 존재하는 게시글인지 검증
    const findPost = await this.postRepository.findByPost(postId);
    if (!findPost) throw new Error('존재하지 않는 게시글입니다.');

    // 로그인된 유저정보
    const { user } = res.locals;

    // 로그인된 유저의 ID
    const userId = user.userId;

    // 해당 유저가 해당 게시글에 좋아요를 눌렀는지 DB에 확인
    const isLike = await this.postRepository.isLike(postId, userId);
    if (!isLike) {
      await this.postRepository.createLike(postId, userId);
      res.status(200).send({ message: '게시글의 좋아요를 등록하였습니다.' });
    } else {
      await this.postRepository.destroyLike(postId, userId);
      res.status(200).send({ message: '게시글의 좋아요를 취소하였습니다.' });
    }
  };

  likePosts = async (userId) => {
    // 유저가 누른 좋아요테이블 리스트
    const likePosts = await this.postRepository.likePosts(userId);

    // 유저가 누른 좋아요 테이블의 userId 배열
    const likeUserIds = likePosts.map((like) => like.postId);
    const result = await this.postRepository.getLikePosts(likeUserIds);

    return result;
  };
}

module.exports = PostService;
