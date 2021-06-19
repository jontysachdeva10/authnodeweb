const bcrypt = require('bcryptjs');
const {  validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @description LOGIN USER
 */
exports.loginUser = async (req, res) => {
    // check validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });    
    }

    const { username, password } = req.body;
    try {
        // check if user exists
        let user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'User does not exist.' }]});
        }
          // compare plain password with hashed password
        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({ errors: [{ msg: 'User does not exist.' }]});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, 
            config.get('jwtSecret'), {
            expiresIn: 360000
        }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server not found');
    }

}