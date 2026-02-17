import { CheckUserCreditsUseCase } from '../CheckUserCreditsUseCase'
import { CreditPolicyService } from '../../../domain/services/CreditPolicyService'
import { BusinessError } from '../../../../shared/errors/BusinessError'
import { CreditRepository } from '../../../ports/CreditRepository'

const mockCreditRepository = (): CreditRepository =>
  ({
    getUserCreditStatus: jest.fn(),
  } as unknown as CreditRepository)

describe('CheckUserCreditsUseCase', () => {
  it('deve permitir quando créditos são válidos', async () => {
    const repo = mockCreditRepository()
    const service = new CreditPolicyService()
    const useCase = new CheckUserCreditsUseCase(
      repo,
      service
    )

    ;(
      repo.getUserCreditStatus as jest.Mock
    ).mockResolvedValue({
      availableCredits: 3,
      creditExpirationDate: null,
    })

    const result = await useCase.execute({
      userId: 'user-1',
      planActive: true,
    })

    expect(result.allowed).toBe(true)
  })

  it('deve lançar erro quando saldo é insuficiente', async () => {
    const repo = mockCreditRepository()
    const service = new CreditPolicyService()
    const useCase = new CheckUserCreditsUseCase(
      repo,
      service
    )

    ;(
      repo.getUserCreditStatus as jest.Mock
    ).mockResolvedValue({
      availableCredits: 0,
      creditExpirationDate: null,
    })

    await expect(
      useCase.execute({
        userId: 'user-1',
        planActive: true,
      })
    ).rejects.toBeInstanceOf(BusinessError)
  })
})