// import express 
const express = require('express');

// init express router
const router = express.Router();

// import register controller
const registerController = require('../controller/RegisterController');

// import login controller
const loginController = require('../controller/LoginController');

// import validate register  
const { validateRegister, validateLogin } = require('../utils/validators/auth');

// define route  for register
router.post('/register', validateRegister, registerController.register);

// define route for login
router.post('/login', validateLogin, loginController.login);

// module exports router
module.exports = router;