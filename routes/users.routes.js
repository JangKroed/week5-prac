const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authLoginUserMiddleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

/**
 * 회원가입 Router 입니다.
 * 이미 로그인 되어있는지 검증을 거치고
 * 로그인이 되어있지 않으면 controller로 진입합니다.
 */
router.post('/signup', Auth, usersController.createUser);

/**
 * 로그인 Router 입니다.
 * 이미 로그인 되어있는지 검증을 거치고
 * 로그인이 되어있지 않으면 controller로 진입합니다.
 */
router.post('/login', Auth, usersController.userLogin);

module.exports = router;
