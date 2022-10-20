const UsersController = require('../../../controllers/users.controller');
const {
  createUserInsertSchemaByController,
  createUserResultSchemaByController,
} = require('../../fixtures/users.fixtures');

const mockUsersService = () => ({
  createUser: jest.fn(),
  userLogin: jest.fn(),
});

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  send: jest.fn(),
};

describe('users Controller Layer Test', () => {
  let usersController = new UsersController();
  usersController.userService = mockUsersService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createUser Method Success Case', async () => {
    mockRequest.body = createUserInsertSchemaByController;
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    usersController.userService.createUser = jest.fn(() => {
      return createUserResultSchemaByController;
    });

    await usersController.createUser(mockRequest, mockResponse);

    // createUser 메소드는 몇번 호출되었는지
    expect(usersController.userService.createUser).toHaveBeenCalledTimes(1);

    // createUser status는 몇번 호출되는가
    expect(mockResponse.status).toHaveBeenCalledTimes(1);

    // createUser status의 반환값은 무엇인가
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // createUser send는 몇번 호출되는가
    expect(mockResponse.send).toHaveBeenCalledTimes(1);

    // createUser send의 반환값은 무엇인가
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: '회원 가입에 성공하였습니다.',
    });
  });

  test('createUser Method Failed Case By ParamsError', async () => {
    mockRequest.body = {
      ...createUserInsertSchemaByController,
      nickname: null,
    };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    usersController.userService.createUser = jest.fn(() => {
      return createUserInsertSchemaByController;
    });

    await usersController.createUser(mockRequest, mockResponse);

    // createUser 메소드는 몇번 호출되었는지
    expect(usersController.userService.createUser).toHaveBeenCalledTimes(0);

    // createUser status의 반환값은 무엇인가.
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // createUser send의 반환값은 무엇인가.
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorMessage:
        '닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성되어야 합니다.',
    });
  });

  test('createUser Method Failed Caes By Confirm Error', async () => {
    mockRequest.body = {
      ...createUserInsertSchemaByController,
      confirm: '1111111',
    };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    usersController.userService.createUser = jest.fn(() => {
      return createUserResultSchemaByController;
    });

    await usersController.createUser(mockRequest, mockResponse);

    // createUser 메소드는 몇번 호출되었는지
    expect(usersController.userService.createUser).toHaveBeenCalledTimes(0);

    // createUser status의 반환값은 무엇인지
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // createUser send의 반환값은 무엇인가.
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorMessage: '비밀번호가 확인란과 일치하지 않습니다.',
    });
  });

  test('createUser Method Failed Case By nickname in password Error', async () => {
    mockRequest.body = {
      ...createUserInsertSchemaByController,
      nickname: 'test1111',
      password: '1111',
    };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    usersController.userService.createUser = jest.fn(() => {
      return createUserResultSchemaByController;
    });

    await usersController.createUser(mockRequest, mockResponse);

    // createUser 메소드는 몇번 호출되었는지
    expect(usersController.userService.createUser).toHaveBeenCalledTimes(0);

    // createUser status의 반환값은 무엇인지
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // createUser send의 반환값은 무엇인가.
    expect(mockResponse.send).toHaveBeenCalledWith({
      errorMessage: '회원 가입에 실패하였습니다.',
    });
  });
});
