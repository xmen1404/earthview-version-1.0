const express = require('express');
const router = express.Router();

const controller = require('../controllers/post.controller');

const verifyToken = require('../middleware/auth');

// @route POST api/posts
// #desc get post
// @access private - login xong mới thấy
router.post('/', verifyToken ,controller.createPost);

// @route GET api/posts
// #desc Get post
// @access private - login xong mới thấy
router.get('/', controller.getPost);


// @route GET api/posts/userId
// #desc Get post
// @access private - login xong mới thấy
router.get('/:id', controller.getPostById);

// @route PUT api/posts
// #desc update post
// @access private - login xong mới thấy
router.put('/:id', verifyToken, controller.updatePost);

// @route PUT api/posts/like
// #desc update postLike
// @access private - login xong mới thấy
router.put('/increment/:id', verifyToken, controller.updatePostIncrement);


// @route DELETE api/posts
// #desc delete post
// @access private - login xong mới thấy
router.delete('/:id', verifyToken, controller.deletePost);

module.exports = router;
