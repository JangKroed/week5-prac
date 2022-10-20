module.exports = {
  /**
   * Users Controller Fixtures
   */
  createUserInsertSchemaByController: {
    nickname: 'test01',
    password: '1111',
    confirm: '1111',
  },

  createUserResultSchemaByController: {
    userId: 1,
    nickname: 'test01',
    password: '$2b$10$FCGv2t41OWCpVBGXRiwYsea/Xd4uyF.lxeTkF7E/sTJeYWYNl0zB6',
  },

  /**
   * Users Service Fixtures
   */
  // Insert Schema
  createUserInsertSchema: {
    nickname: 'test01',
    password: '1111',
  },

  // Result Schema
  createUserResultSchema: {
    userId: 1,
    password: '1111',
    nickname: 'test01',
  },

  /**
   * Users Repository Fixtures
   */
  getUserByOneInsertSchema: {
    nickname: 'test01',
  },

  /**
   * UserRepository.findByUser Method를 사용하기 위한 Schema
   */
  findByUserInsertSchema: {
    nickname: 'test01',
  },

  /**
   * UsersRepository.createUser Method를 사용하기 위한 Schema
   */
  createUserInsertSchemaByRepository: {
    nickname: 'text01',
    password: '1111',
  },
};
