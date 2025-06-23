const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// GET all users
userRouter.get('/', userController.getAllUsers);

// GET user by ID
userRouter.get('/:id', userController.getUserById);

// CREATE user
userRouter.post('/', userController.createUser);

// UPDATE user
userRouter.put('/:id', userController.updateUser);

// DELETE user
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
