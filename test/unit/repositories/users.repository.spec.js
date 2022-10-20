const UserRepository = require('../../../repositories/users.repository');
const {
  createUserInsertSchemaByRepository,
  findByUserInsertSchema,
} = require('../../fixtures/users.fixtures');

const mockUserModel = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('Users Repository Layer Test', () => {
  let userRepository = new UserRepository();
  userRepository.User = mockUserModel();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('findByUser Method toHaveBeenCalled', async () => {
    await userRepository.findByUser(findByUserInsertSchema);

    // findOne 메소드는 몇번 호출 되었는지
    expect(userRepository.User.findOne).toHaveBeenCalledTimes(1);

    // findOne 메소드가 호출된 인자를 검증합니다.
    expect(userRepository.User.findOne).toHaveBeenCalledWith({
      where: {
        nickname: findByUserInsertSchema.nickname,
      },
    });
  });

  test('createUser Method toHaveBeenCalled', async () => {
    await userRepository.createUser(createUserInsertSchemaByRepository);

    // create 메소드는 몇번 호출되었는지
    expect(userRepository.User.create).toHaveBeenCalledTimes(1);

    // create 메소드가 호출된 인자를 검증합니다.
    expect(userRepository.User.create).toHaveBeenCalledWith(
      createUserInsertSchemaByRepository
    );
  });
});
