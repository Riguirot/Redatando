import { Request, Response, NextFunction } from 'express'

export type AuthenticatedUser = {
  id: string
  role: 'student' | 'admin'
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const auth = req.headers.authorization

  if (!auth) {
    return res.status(401).json({
      success: false,
      data: null,
      error: {
        message: 'Unauthenticated',
        code: 'UNAUTHENTICATED',
      },
    })
  }

  /**
   * ============================
   * FASE 7 — AUTH FAKE (TESTES)
   * ============================
   */
  if (process.env.NODE_ENV === 'test') {
    const prefix = 'Bearer test-token-'

    if (!auth.startsWith(prefix)) {
      return res.status(401).json({
        success: false,
        data: null,
        error: {
          message: 'Invalid token',
          code: 'UNAUTHENTICATED',
        },
      })
    }

    const userId = auth.replace(prefix, '')

    req.user = {
      id: userId,
      role: 'student',
    }

    return next()
  }

  /**
   * ============================
   * PRODUÇÃO (JWT entra depois)
   * ============================
   */
  return res.status(401).json({
    success: false,
    data: null,
    error: {
      message: 'Unauthenticated',
      code: 'UNAUTHENTICATED',
    },
  })
}
