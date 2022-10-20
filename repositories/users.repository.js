const { User } = require('../models');

class UserRepository {
  constructor() {
    this.User = User;
  }

  /**
   * 유저 정보를 DB에 저장
   */
  createUser = async ({nickname, password}) => {
    await this.User.create({
      nickname,
      password,
    });
  };

  /**
   * 유저 정보중 닉네임을 기준으로 찾아준다
   */
  findByUser = async ({nickname}) => {
    const user = await this.User.findOne({
      where: {
        nickname,
      },
    });
    return user;
  };
}

module.exports = UserRepository;
