const { User } = require('../models');

class UserRepository {
  createUser = async (nickname, password) => {
    await User.create({
      nickname,
      password,
    });
  };
  findByUser = async (nickname) => {
    const user = await User.findAll({
      where: {
        nickname,
      },
    });

    return user;
  };

  return;
}

module.exports = UserRepository;
