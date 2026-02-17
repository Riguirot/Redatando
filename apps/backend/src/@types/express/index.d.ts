import { AuthenticatedUser } from '../../modules/shared/http/middlewares/auth.middleware'

declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUser
      file?: {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        size: number
        buffer: Buffer
      }
    }
  }
}

export {}
