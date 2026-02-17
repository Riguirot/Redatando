import { Router } from 'express'
import { buildEssayModule } from '../modules/essays/presentation'

const routes = Router()

// ============================
// Modules
// ============================
const essayModule = buildEssayModule()
routes.use(essayModule.routes)

export default routes
