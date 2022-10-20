const UserService = require('../../../service/users.service');
const {
  createUserInsertSchema,
  createUserResultSchema,
} = require('../../fixtures/users.fixtures');

const mockUsersRepository = {
  findByUser: jest.fn(),
  createUser: jest.fn(),
};

describe('users Service Layer Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createUser Method의 Success Case', async () => {
    // 새로운 서비스 할당
    let usersService = new UserService();

    // Repository를 Mocking
    usersService.userRepository = Object.assign({}, mockUsersRepository);

    // Repository의 createUser Method의 Mock된 결과값을 수정
    usersService.userRepository.createUser = jest.fn(
      () => createUserResultSchema
    );

    // Service의 findNaverUser를 Mocking
    usersService.findByUser = jest.fn();

    const user = await usersService.createUser(createUserInsertSchema);
    await usersService.findByUser({ nickname: 'test01' });

    // createNaverUser 메소드를 호출할 때, findNaverUser Services를 호출했는지 검증
    expect(usersService.findByUser).toHaveBeenCalledWith({
      nickname: createUserInsertSchema.nickname,
    });
    expect(usersService.findByUser).toHaveBeenCalledTimes(1);

    // createUser 메소드를 호출할 때, 어떤 값이었는지 검증
    expect(usersService.userRepository.createUser).toHaveBeenCalledWith(
      createUserInsertSchema
    );

    // createNaverUser 메소드가 몇번 호출되었는지 확인
    expect(usersService.userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  test('creaUser Method의 Fail Case By Duplicated nickname', async () => {
    const validationErrorByDuplicatedNicknameSchema = {
      nickname: createUserInsertSchema.nickname,
      password: createUserInsertSchema.password,
    };

    // 새로운 서비스 할당
    let usersService = new UserService();

    // Repository를 Mocking
    usersService.userRepository = Object.assign({}, mockUsersRepository);

    // Repository의 createUser Method의 Mock된 결과값을 수정
    usersService.userRepository.createUser = jest.fn(
      () => createUserResultSchema
    );

    try {
      // Service의 findUser를 Mocking
      usersService.findByUser = jest.fn(
        () => validationErrorByDuplicatedNicknameSchema
      );

      await usersService.createUser(createUserInsertSchema);
    } catch (error) {
      // createUser 메소드를 호출할 때, findUser Services를 호출했는지 검증
      expect(usersService.findByUser).toHaveBeenCalledWith({
        nickname: createUserInsertSchema.nickname,
        password: createUserInsertSchema.password,
      });

      // 현재 발생한 에러의 Instance가 ValidationError Instance와 같은지 검증
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('중복된 닉네임 입니다.');
    }
  });



  
});
