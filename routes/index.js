const express = require('express');
const router = express.Router();

router.use(require('./users.routes'));
// router.use('/posts', require('./posts.routes'));
// router.use('/comments', require('./comments.routes'));

module.exports = router;
