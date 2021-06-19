const User = require('../../models/User');

/**
 * SENDING USER DETAILS TO CLIENT AFTER AUTHENTICATION ****Part of Registeration*****
 */
exports.getUserAfterAuth = async (req, res) => {
    try {
        // sending user details, excluding password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}