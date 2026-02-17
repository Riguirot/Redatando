import { Request, Response, NextFunction } from 'express'

/**
 * Rate limit middleware
 *
 * - Ativo em produção
 * - Ignorado automaticamente em ambiente de teste (Jest)
 */
export function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * ===========================
   * TESTES (JEST)
   * ===========================
   * JEST_WORKER_ID sempre existe quando o Jest está rodando
   */
  if (process.env.JEST_WORKER_ID !== undefined) {
    return next()
  }

  /**
   * ===========================
   * PRODUÇÃO / DEV
   * ===========================
   * Aqui entra a lógica real de rate limit
   *
   * Exemplo simples (placeholder):
   * - por IP
   * - por rota
   */

  try {
    const ip = req.ip

    // TODO: implementar contador real (Redis, memória, etc.)
    // EXEMPLO: allow all por enquanto
    return next()

  } catch (error) {
    return res.status(429).json({
      success: false,
      data: null,
      error: {
        message: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED',
      },
    })
  }
}
