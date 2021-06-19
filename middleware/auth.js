const jwt = require('jsonwebtoken');
const config = require('config');

exports.authenticatingUser = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No Token, authorization denied.' });
    }

    // verify token
    try {
        // decode token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // set the request user = decoded token's user
        // we can use req.user in any of our routes
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
}