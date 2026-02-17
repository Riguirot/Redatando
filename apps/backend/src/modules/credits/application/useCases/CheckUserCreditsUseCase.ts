import { CreditPolicyService } from '../../domain/services/CreditPolicyService'
import { CreditRepository } from '../../ports/CreditRepository'
import { BusinessError } from '../../../shared/errors/BusinessError'

type CheckUserCreditsInput = {
  userId: string
  planActive: boolean
}

type CheckUserCreditsOutput = {
  allowed: true
}

export class CheckUserCreditsUseCase {
  constructor(
    private readonly creditRepository: CreditRepository,
    private readonly creditPolicyService: CreditPolicyService
  ) {}

  async execute(
    input: CheckUserCreditsInput
  ): Promise<CheckUserCreditsOutput> {
    const { userId, planActive } = input

    const {
  availableCredits,
  creditExpirationDate,
} = await this.creditRepository.getUserCreditStatus(userId)

const policyResult = this.creditPolicyService.evaluate({
  availableCredits,
  creditExpirationDate,
  planActive,
})

    if (!policyResult.allowed) {
      throw new BusinessError(
        policyResult.message,
        policyResult.reason
      )
    }

    return { allowed: true }
  }
}
