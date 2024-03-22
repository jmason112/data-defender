const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('./loggingService'); // Import the logging service

const registerUser = async ({ username, email, password, roles }) => {
  try {
    // Check if user already exists by email
    if (await User.findOne({ email })) {
      throw new Error('Email already used');
    }

    // Check if user already exists by username
    if (await User.findOne({ username })) {
      throw new Error('Username already taken');
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      roles,
    });

    await user.save();
    logger.info(`User registered: ${username}`, { service: 'AuthService', action: 'registerUser', username });

    return generateToken(user._id);
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`, { service: 'AuthService', action: 'registerUser', error: error.stack });
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (user && (await user.isValidPassword(password))) {
      logger.info(`User logged in: ${email}`, { service: 'AuthService', action: 'loginUser', email });
      return generateToken(user._id);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`, { service: 'AuthService', action: 'loginUser', error: error.stack });
    throw error;
  }
};

const generateToken = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { 
      expiresIn: '1d',
    });
    logger.info(`Token generated for user ID: ${userId}`, { service: 'AuthService', action: 'generateToken', userId });
    return token;
  } catch (error) {
    logger.error(`Error generating token: ${error.message}`, { service: 'AuthService', action: 'generateToken', error: error.stack });
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};