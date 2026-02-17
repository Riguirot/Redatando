import { Router } from 'express'
import { EssayController } from './controllers/EssayController'
import { authMiddleware } from '../../shared/http/middlewares/auth.middleware'
import { rateLimitMiddleware } from '../../shared/http/middlewares/rateLimit.middleware'

export function createEssayRoutes(controller: EssayController) {
  const router = Router()

  router.post(
    '/essays',
    authMiddleware,
    rateLimitMiddleware,
    controller.submit.bind(controller)
  )

  router.get(
    '/essays/:id',
    authMiddleware,
    rateLimitMiddleware,
    controller.getById.bind(controller)
  )

  return router
}
