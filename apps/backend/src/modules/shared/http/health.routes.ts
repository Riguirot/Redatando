import { Router } from 'express'
import { prisma } from '../database/prismaClient'

const healthRouter = Router()

healthRouter.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    return res.status(200).json({
      status: 'ok',
      database: 'connected'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      database: 'disconnected'
    })
  }
})

export { healthRouter }