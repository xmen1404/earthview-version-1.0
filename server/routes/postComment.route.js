const express = require('express');
const router = express.Router();

const controller = require('../controllers/postComment.controller');

const verifyToken = require('../middleware/auth');

// @route POST api/postLike
// #desc tạo 1 like mới
// @access private - login xong mới thấy
router.post('/:id', verifyToken , controller.commentPost);

// @route POST api/postComment
// #desc tạo 1 like mới
// @access private - login xong mới thấy
router.post('/:postId/:commentId', verifyToken , controller.replyCommentPost);

// @route GET api/postLike/:id
// #desc Get like list của một post
// @access private - login xong mới thấy
router.get('/:id', controller.getPostComment);

// @route GET api/postLike/:id
// #desc Get like list của một post
// @access private - login xong mới thấy
router.get('/:postId/:commentId', controller.getReplyPostComment);



// @route GET api/postLike/:id
// #desc Get like list của một post
// @access private - login xong mới thấy
// router.get('/check/:id', verifyToken, controller.checkPostLike);


// @route PUT api/posts
// #desc update post
// @access private - login xong mới thấy
router.put('/:id', verifyToken, controller.updateComment);


// @route DELETE api/postLike
// #desc delete like
// @access private - login xong mới thấy
router.delete('/:id', verifyToken, controller.deleteComment);

module.exports = router;
