const UserService = require('../service/users.service');

class UsersController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    // try {
    await this.userService.createUser(req, res);

    // } catch (error) {
    //   res.status(400).send({ message: error.message });
    // }
  };

  userLogin = async (req, res, next) => {
    // try {
    await this.userService.userLogin(req, res);
    // } catch (error) {
    //   res.status(400).send({ message: error.message });
    // }
  };
}

module.exports = UsersController;
