const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const logger = require('../services/loggingService');

// Basic rate-limiting middleware for API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    logger.error('Rate limit exceeded', { ip: req.ip, url: req.originalUrl });
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  },
  onLimitReached: (req, res, options) => {
    logger.warn('Approaching rate limit', { ip: req.ip, url: req.originalUrl });
  }
});

// Middleware to apply security practices
const applySecurityMiddlewares = (app) => {
  app.use(helmet()); // Helmet helps secure Express apps by setting various HTTP headers.
  app.use(hpp()); // Protect against HTTP Parameter Pollution attacks
  app.use(limiter); // Apply rate limiting to all requests

  logger.info('Security middlewares applied successfully.');
};

module.exports = applySecurityMiddlewares;