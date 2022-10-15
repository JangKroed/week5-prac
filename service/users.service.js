const UserRepository = require('../repositories/Users.repository');

class UserService {
  userRepository = new UserRepository();

  findByUser = async (nickname)=>{
    const findNickname = await this.userRepository.findByUser(nickname)

    return findNickname
  }

  createUser = async (nickname, password) => {
    await this.userRepository.createUser(
      nickname,
      password,
    );

    return;
  };
}

module.exports = UserService;
