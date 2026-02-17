// src/modules/credits/domain/services/CreditPolicyService.ts

export enum CreditBlockReason {
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',
  CREDITS_EXPIRED = 'CREDITS_EXPIRED',
  PLAN_INACTIVE = 'PLAN_INACTIVE',
}

export type CreditPolicyInput = {
  availableCredits: number
  creditExpirationDate: Date | null
  planActive: boolean
}

export type CreditPolicyResult =
  | {
      allowed: true
      message: string
    }
  | {
      allowed: false
      reason: CreditBlockReason
      message: string
    }

export class CreditPolicyService {
  private static readonly CREDITS_REQUIRED_PER_ESSAY = 1

  evaluate(input: CreditPolicyInput): CreditPolicyResult {
    const {
      availableCredits,
      creditExpirationDate,
      planActive,
    } = input

    // 1️⃣ Plano inativo
    if (!planActive) {
      return {
        allowed: false,
        reason: CreditBlockReason.PLAN_INACTIVE,
        message:
          'Seu plano está inativo. Regularize ou realize um upgrade para continuar.',
      }
    }

    // 2️⃣ Créditos expirados
    if (
      creditExpirationDate &&
      creditExpirationDate.getTime() < Date.now()
    ) {
      return {
        allowed: false,
        reason: CreditBlockReason.CREDITS_EXPIRED,
        message:
          'Seus créditos expiraram. Faça um upgrade de plano para continuar.',
      }
    }

    // 3️⃣ Saldo insuficiente
    if (
      availableCredits <
      CreditPolicyService.CREDITS_REQUIRED_PER_ESSAY
    ) {
      return {
        allowed: false,
        reason: CreditBlockReason.INSUFFICIENT_CREDITS,
        message:
          'Você não possui créditos suficientes para enviar uma redação.',
      }
    }

    // ✅ Tudo ok
    return {
      allowed: true,
      message:
        'Crédito validado com sucesso. Envio de redação liberado.',
    }
  }
}
