import { CheckUserCreditsUseCase } from '../application/useCases/CheckUserCreditsUseCase'
import { creditRepository } from './database'
import { CreditPolicyService } from '../domain/services/CreditPolicyService'

const creditPolicyService = new CreditPolicyService()

export const checkUserCreditsUseCase = new CheckUserCreditsUseCase(
  creditRepository,
  creditPolicyService
)
