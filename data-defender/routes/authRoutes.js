const express = require('express');
const { registerUser, loginUser } = require('../services/authService');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log('Attempting to register a new user with email:', req.body.email);
    const token = await registerUser(req.body);
    res.status(201).json({ token });
    console.log('User registered successfully with email:', req.body.email);
  } catch (error) {
    console.error('Error registering new user:', error, error.stack);
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt for user:', req.body.email);
    const token = await loginUser(req.body);
    res.json({ token });
    console.log('User logged in successfully:', req.body.email);
  } catch (error) {
    console.error('Login attempt failed:', error, error.stack);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;