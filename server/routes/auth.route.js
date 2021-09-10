const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth')
// const  User = require('../models/user.model')
const jwt = require('jsonwebtoken')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, controller.validateUser);

// @route POST api/auth/register
// @desc Register user
// @access public
router.post('/register', controller.register);
router.post('/login', controller.login);

// @route POST api/auth/facebooklogin
// @desc login user
// @access public
router.post('/facebooklogin', controller.facebookLogin);

// @route POST api/auth/googlelogin
// @desc login user
// @access public
router.post('/googlelogin', controller.googleLogin);


// @route GET api/auth
// @desc update userprofile
// @access private
router.put('/', verifyToken, controller.updateUser);

module.exports = router;