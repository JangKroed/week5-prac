// const PostsController = require('../controllers/posts.controller');
// const postsController = new PostsController();

// // const req = {
// //   body: { title: '', content: '' },
// //   params: { postId: 1 },
// // };
// // const res = {
// //   status: jest.fn(() => res),
// //   json: jest.fn(() => res),
// //   send: jest.fn(),
// // };
// // const next = jest.fn();

// describe('postsController', () => {
//   const req = {
//     body: { title: '', content: '내용입니다.' },
//   };
//   const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(() => res),
//     send: jest.fn(),
//   };
//   test('제목을 입력하지 않았습니다.', async () => {
//     await postsController.createPost(req, res);
//     expect(res.send).toBeCalledWith({
//       message: '게시글 작성에 실패하였습니다.',
//     });
//   });
// });

// describe('postsController', () => {
//   const req = {
//     body: { title: '제목입니다.', content: '' },
//   };
//   const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(() => res),
//     send: jest.fn(),
//   };
//   test('내용을 입력하지 않았습니다.', async () => {
//     await postsController.createPost(req, res);
//     expect(res.send).toBeCalledWith({
//       message: '게시글 작성에 실패하였습니다.',
//     });
//   });
// });

// describe('postsController', () => {
//   const req = {
//     body: { title: '제목입니다.', content: '내용입니다.' },
//   };
//   const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(() => res),
//     send: jest.fn(),
//   };

//   jest.mock('../controllers/posts.controller');
//   test('로그인을 하지 않았습니다.', async () => {
//     await postsController.createPost.mockReturnValue(req, res);
//     const post = postsController.createPost();
//     expect(post).toBeCalledWith({
//       message:
//         "Cannot destructure property 'user' of 'res.locals' as it is undefined.",
//     });
//   });
// });

// // describe('postsController', () => {
// //   const mockFn = jest.fn();
// //   const req = {};
// //   const res = {
// //     status: jest.fn(() => res),
// //     json: jest.fn(() => res),
// //     send: jest.fn(),
// //   };

// //   test('게시글 전체목록을 불러옵니다.', async () => {
// //     await postsController.getPost(req, res);
// //     expect(res.send).toBeCalledWith({
// //       message:
// //         "Cannot destructure property 'user' of 'res.locals' as it is undefined.",
// //     });
// //   });
// // });

// const Post = require('../models/post');
// const app = require('../app');
// const request = require('supertest');

// // main
// it('GET /posts 성공 시 Status Code는 200을 반환한다.', async () => {
//   const response = await request(app).get('/posts');
//   expect(response.statusCode).toBe(200);
// });

const httpMocks = require('node-mocks-http');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
// const model = require('../models');
// const mockFindPasswordById = jest.spyOn(model, 'findPasswordById');
// jest.mock(new PostsController())
test('슈발 뭐 테스트 하지', async () => {
  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/posts',
    body: {
      title: '',
      content: '',
    },
  });
  const res = httpMocks.createResponse();
  const next = null;
  // const expectedResult = {title:"",content:""}
  // mockFindPasswordById.mockResolvedValue(expectedResult)

  await postsController.getPost(req, res, next);

  expect(res.statusCode).toBe(400);
  expect(res._getJSONData()).toStrictEqual({ asd: 'asd' });
});

// //테스트하고 싶은 미들웨어
// const unitUnderTest = require('./middleware')
// const httpMocks = require('node-mocks-http');
// //Jest 문법으로 Mocha의 describe() & it()과 동일
// test('헤더에 인증정보가 없는 요청은, http status 403을 리턴해야한다.', () => {
//   const request = httpMocks.createRequest({
//     method: 'GET',
//     url: '/user/42',
//     headers: {
//       authentication: ''
//     }
//   });
//   const response = httpMocks.createResponse();
//   unitUnderTest(request, response);
//   expect(response.statusCode).toBe(403);
// });

const app = require('../app');
const supertest = require('supertest');
test('/posts 경로에 요청했을 때 status code가 200이어야 한다.', async () => {
  const res = await supertest(app).get('/posts');
  expect(res.status).toEqual(200);
});

test('/ 경로에 요청했을 때 status code가 404이어야 한다.', async () => {
  const res = await supertest(app).get('/');
  expect(res.status).toEqual(404);
});

// const authMiddleware = require('../middlewares/authMiddleware');

// jest.mock('../middlewares/authMiddleware');

// const { User } = require('../models');

// test('정상적인 토큰을 넣은 경우 User.findByPk가 실행된다.', () => {
//   User.findByPk = jest.fn();

//   authMiddleware(
//     {
//       headers: {
//         authorization:
//           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJuaWNrbmFtZSI6InRlc3QxNCIsImlhdCI6MTY2NjA3OTczNSwiZXhwIjoxNjY2MTY2MTM1fQ.vBHa6gtdvYoEl-jVhGkME-rO50vQ7aXQ5O1HmK9Mqeo',
//       },
//     },
//     {
//       status: () => ({
//         send: () => {},
//       }),
//       locals: {},
//     }
//   );

//   expect(User.findByPk).toHaveBeenCalledTimes(1);
//   expect(User.findByPk).toHaveBeenCalledWith(99);
// });
