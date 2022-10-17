const UserService = require('../service/users.service');
const joi = require('../util/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsersController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    try {
      const { nickname, password, confirm } =
        await joi.signupSchema.validateAsync(req.body);

      if (password !== confirm)
        throw new Error('비밀번호가 확인란과 일치하지 않습니다.');

      if (password.includes(nickname) || nickname.includes(password))
        throw new Error('회원 가입에 실패하였습니다.');

      const existUser = await this.userService.findByUser(nickname);

      if (existUser) throw new Error('중복된 닉네임 입니다.');

      const hashed = await bcrypt.hash(password, 10);
      const users = Object.create({ nickname, password: hashed });

      await this.userService.createUser(users);

      res.status(200).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  userLogin = async (req, res, next) => {
    try {
      const { nickname, password } = await joi.loginSchema.validateAsync(
        req.body
      );

      const user = await this.userService.findByUser(nickname);

      const isEqualPw = await bcrypt.compare(password, user.password);

      if (!user || !isEqualPw)
        throw new Error('닉네임 또는 패스워드를 확인해주세요');

      const expires = new Date();

      expires.setMinutes(expires.getMinutes() + 60);

      const token = jwt.sign(
        { userId: user.userId, nickname: user.nickname },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );

      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
      });

      res.send({
        token: token,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
}

module.exports = UsersController;
