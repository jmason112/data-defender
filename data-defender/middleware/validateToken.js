const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(`Token validation error: ${error.message}`, error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    console.log('No token provided, authorization denied.');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = validateToken;