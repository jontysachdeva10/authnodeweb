const express = require('express');
const router = express.Router();

/**
 * @description AUTHENTICATING USER
 */
const { authenticatingUser } =  require('../middleware/auth');
const { getUserAfterAuth } = require('../controller/login/auth');
router.get('/', authenticatingUser, getUserAfterAuth);

module.exports = router;