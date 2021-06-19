const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser } = require('../controller/register/register');

/**
 * @description ADD USER
 */
router.post('/', [
    body('name', 'Name is required').notEmpty(),
    body('username', 'Username is required').notEmpty(),
    body('password', 'Please enter your Password').notEmpty(),
    body('city', 'Please enter your City').notEmpty(),
    body('phone', 'Enter valid Phone No.').isLength({ min: 10, max: 10})
], registerUser);

module.exports = router;