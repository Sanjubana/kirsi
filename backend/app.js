const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Load environment variables
require('dotenv').config();

// Load routes
const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crops');
const toolRoutes = require('./routes/tools');
const animalRoutes = require('./routes/animals');
const mechanicRoutes = require('./routes/mechanics');

// Load error handler middleware
const errorHandler = require('./middleware/error');

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: false // Allows loading local images in frontend
}));

// CORS setup - allows credentials and maps to standard local frontend
const allowedOrigins = [
  'http://localhost:5173', // standard Vite dev port
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

// HTTP Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate Limiting (15 mins window, 100 requests per IP on auth routes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.'
  }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/mechanics', mechanicRoutes);

// Config API (Provides active environment parameters for frontend if needed)
app.get('/api/config', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Configuration parameters retrieved successfully',
    data: {
      googleMapsEnabled: !!process.env.VITE_GOOGLE_MAPS_API_KEY,
      weatherApiEnabled: !!process.env.VITE_WEATHER_API_KEY
    }
  });
});

// Wildcard API Route 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route Not Found - [${req.method}] ${req.originalUrl}`
  });
});

// Global Error Catcher
app.use(errorHandler);

module.exports = app;
