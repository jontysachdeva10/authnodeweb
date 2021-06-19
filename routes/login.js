const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

/**
 * @description LOGIN
 */
const { loginUser } = require('../controller/login/login');
router.post('/', [
    body('username', 'Username cannot be null').notEmpty(),
    body('password', 'Passowrd is required').exists()
], loginUser);

module.exports = router;