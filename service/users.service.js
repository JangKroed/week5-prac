const UserRepository = require('../repositories/Users.repository');

class UserService {
  userRepository = new UserRepository();

  createUser = async (nickname, password) => {
    await this.userRepository.createUser(nickname, password);

    return;
  };

  findByUser = async (nickname) => {
    const findNickname = await this.userRepository.findByUser(nickname);

    return findNickname;
  };
}

module.exports = UserService;
