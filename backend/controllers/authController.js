const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email is already taken
    const takenUserEmail = await User.findOne({ email });
    const takenUsername = await User.findOne({ username });

    if (takenUserEmail || takenUsername) {
      return res.status(403).send({ error: 'Username or Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' },
      (error, token) => {
        if (error) {
          console.error('JWT error:', error.message);
          return res.status(400).send({ error: 'Token generation failed' });
        }

        return res.status(201).send({
          message: 'User registered successfully',
          accessToken: token,
          user: payload,
        });
      }
    );
  } catch (error) {
    console.error('Signup error:', error.message);
    return res.status(500).send({ error: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const payload = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' },
      (error, token) => {
        if (error) {
          console.error('JWT error:', error.message);
          return res.status(400).send({ error: 'Login failed' });
        }

        return res.status(200).send({
          message: 'Login successful',
          accessToken: token,
          user: payload,
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).send({ error: 'Error logging in' });
  }
};
