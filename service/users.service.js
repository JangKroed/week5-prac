const UserRepository = require('../repositories/Users.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();
  /**
   * controller에서 받은 유저 정보를 가공하고 닉네임 중복여부를 검사합니다.
   * @param {*} users
   * @returns
   */
  createUser = async (users) => {
    // 중복 닉네임 검증을 위한 가공처리
    const { nickname, password } = users;
    const existUser = await this.userRepository.findByUser(nickname);
    if (existUser) throw new Error('중복된 닉네임 입니다.');

    // repository로 유저정보 전달
    await this.userRepository.createUser(nickname, password);

    return;
  };

  /**
   * 받은 정보를 가공하고 유효한 유저인지 검증합니다.
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  userLogin = async (req, res) => {
    // 유저가 입력한 정보
    const { nickname, password } = req.body;

    // nickname으로 찾아온 유저정보
    const userDB = await this.userRepository.findByUser(nickname);

    // 유저정보가 없거나 비밀번호가 틀릴시
    if (!userDB) throw new Error('닉네임 또는 패스워드를 확인해주세요');
    // 패스워드 검증
    const isEqualPw = await bcrypt.compare(password, userDB.password);
    if (!isEqualPw) throw new Error('닉네임 또는 패스워드를 확인해주세요');

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const token = jwt.sign(
      { userId: userDB.userId, nickname: userDB.nickname },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
      expires: expires,
    });

    return token;
  };
}

module.exports = UserService;
