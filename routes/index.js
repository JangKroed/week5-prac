// requires
const express = require('express');
const router = express.Router();

/**
 * middlewares
 * 해당하는 각 라우터로 이동합니다.
 */
router.use(require('./users.routes'));
router.use('/posts', require('./posts.routes'));
router.use('/comments', require('./comments.routes'));

module.exports = router;
