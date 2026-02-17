import { Request, Response, NextFunction } from 'express'

export function requireRole(role: 'student' | 'admin') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        data: null,
        error: {
          message: 'Forbidden',
          code: 'FORBIDDEN',
        },
      })
    }

    next()
  }
}
