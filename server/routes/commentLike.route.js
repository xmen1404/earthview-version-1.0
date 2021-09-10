const express = require('express');
const router = express.Router();

const controller = require('../controllers/commentLike.controller');

const verifyToken = require('../middleware/auth');

// @route POST api/postLike
// #desc tạo 1 like mới
// @access private - login xong mới thấy
router.post('/:id', verifyToken , controller.likeComment);

// @route GET api/postLike/:id
// #desc Get like list của một post
// @access private - login xong mới thấy
router.get('/:id', controller.getCommentLike);


// @route GET api/postLike/:id
// #desc Get like list của một post
// @access private - login xong mới thấy
router.get('/check/:id', verifyToken, controller.checkCommentLike);


// // @route PUT api/posts
// // #desc update post
// // @access private - login xong mới thấy
// router.put('/:id', verifyToken, controller.updatePost);

// @route DELETE api/postLike
// #desc delete like
// @access private - login xong mới thấy
router.delete('/:id', verifyToken, controller.unlikeComment);

module.exports = router;
