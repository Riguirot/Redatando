import { Request, Response, NextFunction } from 'express'
import { BusinessError } from '../../errors/BusinessError'

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof BusinessError) {
    const statusMap: Record<
      'NOT_FOUND' | 'FORBIDDEN' | 'UNAUTHENTICATED' | 'FILE_REQUIRED',
      number
    > = {
      NOT_FOUND: 404,
      FORBIDDEN: 403,
      UNAUTHENTICATED: 401,
      FILE_REQUIRED: 400,
    }

    const status =
      statusMap[error.code as keyof typeof statusMap] ?? 400

    return res.status(status).json({
      success: false,
      data: null,
      error: {
        message: error.message,
        code: error.code,
      },
    })
  }

  // erro inesperado
  return res.status(500).json({
    success: false,
    data: null,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    },
  })
}
