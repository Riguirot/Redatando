import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../errors/AppError'
import { successResponse } from '../response'

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      data: null,
      error: {
        message: err.message,
        code: err.code
      }
    })
  }

  console.error(err)

  return res.status(500).json({
    success: false,
    data: null,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR'
    }
  })
}
