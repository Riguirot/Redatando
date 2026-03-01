import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes'

import competenceRoutes from './modules/competences/competence.routes'
import progressRoutes from './modules/progress/progress.routes'

import { rateLimitMiddleware } from './modules/shared/http/middlewares/rateLimit.middleware'
import { errorMiddleware } from './modules/shared/http/middlewares/error.middleware'
import { sanitizeMiddleware } from './modules/shared/http/middlewares/validation.middleware'
import { healthRouter } from './modules/shared/http/health.routes'

const app = express()

// ================================
// Global Middlewares
// ================================

// Segurança básica HTTP headers
app.use(helmet())

// CORS controlado por ambiente
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite ferramentas como Postman e chamadas server-to-server
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
  })
)

// Parser JSON
app.use(express.json())

// Rate limit global
app.use(rateLimitMiddleware)

// Sanitização global
app.use(sanitizeMiddleware)

// ================================
// Routes
// ================================

// Health check (infra-level)
app.use('/health', healthRouter)

// API routes
app.use('/api', routes)
app.use('/api/competences', competenceRoutes)
app.use('/api/users', progressRoutes)

// ================================
// Error handler (always last)
// ================================
app.use(errorMiddleware)

export default app
