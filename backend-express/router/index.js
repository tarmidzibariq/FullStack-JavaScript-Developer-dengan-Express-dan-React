// import express 
const express = require('express');

// init express router
const router = express.Router();

// import auth middleware
const verifyToken = require('../middlewares/auth');

// import register controller
const registerController = require('../controller/RegisterController');

// import login controller
const loginController = require('../controller/LoginController');

// import user controller
const userController = require('../controller/UserController');

// import validate register  
const { validateRegister, validateLogin } = require('../utils/validators/auth');

// import validate user
const { validateUser } = require('../utils/validators/user');

// define route  for register
router.post('/register', validateRegister, registerController.register);

// define route for login
router.post('/login', validateLogin, loginController.login);

// define route for find user
router.get('/admin/users', verifyToken, userController.findUser);

// define route for create user
router.post('/admin/users', verifyToken, validateUser, userController.createUser);

// define route for find user by id
router.get('/admin/users/:id', verifyToken, userController.findUserById);

// define route for update user
router.put('/admin/users/:id', verifyToken, validateUser, userController.updateUser);


// module exports router
module.exports = router;