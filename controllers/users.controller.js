const UserService = require('../service/users.service');
const joi = require('../util/joi');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsersController {
  userService = new UserService();

  /**
   * 클라이언트로 부터 받은 유저정보를 검증하고 암호화 합니다.
   */
  createUser = async (req, res, next) => {
    try {
      // 회원가입 정보 입력 검증
      const { nickname, password, confirm } =
        await joi.signupSchema.validateAsync(req.body);

      if (password !== confirm)
        throw new Error('비밀번호가 확인란과 일치하지 않습니다.');
      // 비밀번호가 닉네임에 포함 or 닉네임이 비밀번호에 포함
      if (password.includes(nickname) || nickname.includes(password))
        throw new Error('회원 가입에 실패하였습니다.');

      // 비밀번호 hash
      const hashed = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUND)
      );
      const users = Object.create({ nickname, password: hashed });

      // hash된 유저 정보를 service로 전달
      await this.userService.createUser(users);

      res.status(200).send({ message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ errorMessage: error.message });
    }
  };

  /**
   * 클라이언트로부터 받은 정보를 1차적으로 검증하고 service로 전달합니다.
   */
  userLogin = async (req, res, next) => {
    try {
      // 로그인 정보 입력 검증
      await joi.loginSchema.validateAsync(req.body);

      // 유저 정보를 service로 전달
      const token = await this.userService.userLogin(req, res);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);
      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
      });

      // response로 token을 전달
      res.send({
        token: token,
      });
    } catch (error) {
      res.status(error.status || 400).send({ message: error.message });
    }
  };
}

module.exports = UsersController;
