const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const req = {
  body: {
    title: '',
    content: '25256',
  },
};
test('제목을 입력하지 않았습니다.', async () => {
  expect(await postsController.createPost(req)).toThrow('게시글 작성에 실패하였습니다.');
});
