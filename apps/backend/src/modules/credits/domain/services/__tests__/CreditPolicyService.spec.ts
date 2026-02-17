import {
  CreditPolicyService,
  CreditBlockReason,
} from '../CreditPolicyService'

describe('CreditPolicyService', () => {
  const service = new CreditPolicyService()

  it('deve bloquear quando o plano está inativo', () => {
    const result = service.evaluate({
      availableCredits: 10,
      creditExpirationDate: null,
      planActive: false,
    })

    expect(result.allowed).toBe(false)
    if (!result.allowed) {
      expect(result.reason).toBe(
        CreditBlockReason.PLAN_INACTIVE
      )
    }
  })

  it('deve bloquear quando créditos estão expirados', () => {
    const result = service.evaluate({
      availableCredits: 10,
      creditExpirationDate: new Date('2020-01-01'),
      planActive: true,
    })

    expect(result.allowed).toBe(false)
    if (!result.allowed) {
      expect(result.reason).toBe(
        CreditBlockReason.CREDITS_EXPIRED
      )
    }
  })

  it('deve bloquear quando saldo é insuficiente', () => {
    const result = service.evaluate({
      availableCredits: 0,
      creditExpirationDate: null,
      planActive: true,
    })

    expect(result.allowed).toBe(false)
    if (!result.allowed) {
      expect(result.reason).toBe(
        CreditBlockReason.INSUFFICIENT_CREDITS
      )
    }
  })

  it('deve permitir quando tudo está válido', () => {
    const result = service.evaluate({
      availableCredits: 5,
      creditExpirationDate: null,
      planActive: true,
    })

    expect(result.allowed).toBe(true)
  })
})
