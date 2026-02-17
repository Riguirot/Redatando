import { CreditBlockReason } from '../services/CreditPolicyService'

export class CreditBlockedError extends Error {
  constructor(
    public readonly reason: CreditBlockReason,
    message: string
  ) {
    super(message)
    this.name = 'CreditBlockedError'
  }
}
