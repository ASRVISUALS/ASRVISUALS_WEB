import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/database'
import ensureDefaultAdmin from './utils/ensureDefaultAdmin'

// Import routes
import authRoutes from './routes/authRoutes'
import bookingRoutes from './routes/bookingRoutes'
import paymentRoutes from './routes/paymentRoutes'
import contactRoutes from './routes/contactRoutes'
import blogRoutes from './routes/blogRoutes'
import contentRoutes from './routes/contentRoutes'
import userRoutes from './routes/userRoutes'
import pageRoutes from './routes/pageRoutes'

dotenv.config()

const app = express()

app.set('trust proxy', 1)

// Connect to MongoDB and ensure default admin exists
connectDB().then(() => ensureDefaultAdmin())

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}))
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_APP_URL,
  'http://localhost:3000',
  'http://localhost:5173'
]
  .filter(Boolean)
  .flatMap(origin => origin!.split(',').map(value => value.trim()))

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Setup-Key'],
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' })) // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/pages', pageRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Don't log sensitive information in production
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack)
  }
  
  // Don't expose internal errors to clients
  const statusCode = err.status || 500
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message || 'Something went wrong!'
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

const PORT = process.env.PORT || 5000

// Only start server if not running in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app