import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes'

import competenceRoutes from "./modules/competences/competence.routes"
import progressRoutes from "./modules/progress/progress.routes"

import { rateLimitMiddleware } from './modules/shared/http/middlewares/rateLimit.middleware'
import { errorMiddleware } from './modules/shared/http/middlewares/error.middleware'
import { sanitizeMiddleware } from './modules/shared/http/middlewares/validation.middleware'

const app = express()

// ============================
// Global middlewares
// ============================
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(rateLimitMiddleware)
app.use(sanitizeMiddleware)

// ============================
// Routes
// ============================
app.use('/api', routes)
app.use("/api/competences", competenceRoutes)
app.use("/api/users", progressRoutes)

// ============================
// Error handler (always last)
// ============================
app.use(errorMiddleware)

export default app
