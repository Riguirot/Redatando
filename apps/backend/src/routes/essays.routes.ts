import { Router } from 'express'
import { authMiddleware } from '../modules/shared/http/middlewares/auth.middleware'
import { rateLimitMiddleware } from '../modules/shared/http/middlewares/rateLimit.middleware'
import { essayController } from '../modules/essays/infra/essay.factory'

const router = Router()

router.post(
  '/',
  authMiddleware,
  rateLimitMiddleware,
  essayController.submit.bind(essayController)
)

router.get(
  '/:id',
  authMiddleware,
  rateLimitMiddleware,
  essayController.getById.bind(essayController)
)

export { router }
