const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const forceHttps = require('./middleware/forceHttps');
require('dotenv').config();
const connectDB = require("./db")

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Apply security middlewares
app.use(helmet()); // Helmet helps secure Express apps by setting various HTTP headers.
app.use(hpp()); // Protect against HTTP Parameter Pollution attacks

// Basic rate-limiting middleware for API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Force HTTPS in production environment
if (process.env.NODE_ENV === 'production') {
  app.use(forceHttps);
}

const PORT = process.env.PORT || 3000;

console.log('Port from environment:', process.env.PORT);

app.get('/', (req, res) => {
  console.log('Responding to root route');
  res.send('Hello World');
});

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Failed to start server:', error);
});

connectDB();