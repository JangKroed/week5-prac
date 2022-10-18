const { User } = require('../models');

class UserRepository {
  /**
   * 유저 정보를 DB에 저장
   * @param {*} nickname 
   * @param {*} password 
   */
  createUser = async (nickname, password) => {
    await User.create({
      nickname,
      password,
    });
  };

  /**
   * 유저 정보중 닉네임을 기준으로 찾아준다
   * @param {*} nickname 
   * @returns 
   */
  findByUser = async (nickname) => {
    const user = await User.findOne({
      where: {
        nickname,
      },
    });
    return user;
  };
}

module.exports = UserRepository;
