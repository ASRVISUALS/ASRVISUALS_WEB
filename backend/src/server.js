const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AppError = require('./utils/AppError');

dotenv.config();

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

mongoose.set('bufferCommands', false);
const DB_RETRY_MS = Number(process.env.DB_RETRY_MS || 10000);
let isConnectingDb = false;
let reconnectTimer = null;
let connectPromise = null;

// Security Middleware - Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      mediaSrc: ["'self'", "https:"],
      connectSrc: ["'self'", "https:", "http://localhost:5000", "http://localhost:5001"],
    },
  },
  hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
}));

// CORS with restricted origins
const allowedOrigins = [
  'https://asrvisuals.live',
  'https://www.asrvisuals.live',
  'https://asrvisuals.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(compression({
  level: 6,
  threshold: 1024,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 login attempts per hour
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Apply rate limiting
app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Accept accidental double-prefix API paths like /api/api/* from legacy clients.
app.use((req, res, next) => {
  if (typeof req.url === 'string' && req.url.startsWith('/api/api/')) {
    req.url = req.url.replace('/api/api/', '/api/');
  }
  return next();
});

const scheduleReconnect = () => {
  if (reconnectTimer) {
    return;
  }

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectDatabase();
  }, DB_RETRY_MS);

  console.log(`Retrying MongoDB connection in ${DB_RETRY_MS / 1000}s...`);
};

// Database Connection with retry
const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (connectPromise) {
    return connectPromise;
  }

  isConnectingDb = true;

  connectPromise = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  })
    .then(() => {
      console.log('MongoDB connected');

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }

      return true;
    })
    .catch((err) => {
      console.log('MongoDB connection error:', err.message);
      scheduleReconnect();
      return false;
    })
    .finally(() => {
      isConnectingDb = false;
      connectPromise = null;
    });

  return connectPromise;
};

connectDatabase();

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  scheduleReconnect();
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB runtime error:', err.message);
});

app.get('/api/health', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDatabase();
  }

  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = states[mongoose.connection.readyState] || 'unknown';
  const isUp = mongoose.connection.readyState === 1;

  res.status(isUp ? 200 : 503).json({
    status: isUp ? 'success' : 'failure',
    data: {
      database: state,
    },
    message: isUp ? 'API is healthy' : 'API is running but database is not connected',
  });
});

app.use('/api', async (req, res, next) => {
  if (req.path === '/health' || req.path.startsWith('/youtube/')) {
    return next();
  }

  if (mongoose.connection.readyState !== 1) {
    await connectDatabase();
  }

  if (mongoose.connection.readyState !== 1) {
    return next(new AppError('Service temporarily unavailable. Please try again shortly.', 503));
  }

  return next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/youtube', require('./routes/youtubeRoutes'));

// SEO Sitemaps (dynamic XML generation)
app.use('/api/sitemap', require('./routes/sitemapRoutes'));
// Also serve sitemaps at root for search engines
app.use('/sitemap', require('./routes/sitemapRoutes'));

app.use('*', (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const dbDisconnected =
    err?.name === 'MongooseError' &&
    typeof err?.message === 'string' &&
    (err.message.includes('before initial connection is complete') ||
      err.message.includes('ECONNREFUSED') ||
      err.message.includes('Server selection timed out'));

  const isCastError = err?.name === 'CastError';
  const isValidationError = err?.name === 'ValidationError';
  const isDuplicateKey = err?.code === 11000;

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  if (dbDisconnected) {
    statusCode = 503;
    message = 'Database is not connected. Please try again shortly.';
  } else if (isCastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (isValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  } else if (isDuplicateKey) {
    statusCode = 409;
    const duplicateFields = Object.keys(err.keyValue || {}).join(', ');
    message = `Duplicate value for: ${duplicateFields || 'unique field'}`;
  }

  if (statusCode >= 500) {
    if (err?.isOperational) {
      console.warn('Operational API issue:', message);
    } else {
      console.error('Unhandled API error:', err);
    }
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message,
  });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on('SIGINT', () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    process.exit(0);
  });
}

module.exports = app;
