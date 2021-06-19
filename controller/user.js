const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// Import User model
const User = require("../../models/User");

/**
 * @description ADD USER
 */
exports.registerUser = async (req, res) => {
  // check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, username, password, city, phone } = req.body;
  try {
    // check if user exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist." }] });
    }
    
    // creating a user instance and sending avatar value
    user = new User({
      name,
      username,
      password,
      city,
      phone,
    });

    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // When user registers, we want user to get logged in -> So, returning JWT
    // creating token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};
