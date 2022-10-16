const UserRepository = require('../repositories/Users.repository');
const joi = require('../util/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserService {
  userRepository = new UserRepository();

  findByUser = async (nickname) => {
    const findNickname = await this.userRepository.findByUser(nickname);

    return findNickname;
  };

  createUser = async (req, res) => {
    try {
      const { nickname, password, confirm } =
        await joi.signupSchema.validateAsync(req.body);

      if (password !== confirm)
        throw new Error('비밀번호가 확인란과 일치하지 않습니다.');

      if (password.includes(nickname) || nickname.includes(password))
        throw new Error('회원 가입에 실패하였습니다.');

      const existUser = await this.userRepository.findByUser(nickname);

      if (existUser.length) throw new Error('중복된 닉네임 입니다.');

      await this.userRepository.createUser(nickname, password);
      res.status(200).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  userLogin = async (req, res) => {
    try {
      const { nickname, password } = await joi.loginSchema.validateAsync(
        req.body
      );

      const user = await this.userRepository.userLogin(nickname, password);

      if (!user) throw new Error('닉네임 또는 패스워드를 확인해주세요');

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      const token = jwt.sign(
        { userId: user.userId, nickname: user.nickname },
        process.env.SECRET_KEY,
        { expiresIn: '10m' }
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

module.exports = UserService;