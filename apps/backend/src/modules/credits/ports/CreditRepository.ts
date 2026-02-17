// src/modules/credits/ports/CreditRepository.ts

import {
  CreditTransaction,
  CreditTransactionType,
} from '../domain/entities/CreditTransaction'

export type CreateCreditTransactionParams = {
  userId: string
  type: CreditTransactionType
  amount: number
  description?: string
  expiresAt?: Date | null
}

export interface CreditRepository {
  findByUserId(userId: string): Promise<CreditTransaction[]>

  create(
    params: CreateCreditTransactionParams
  ): Promise<CreditTransaction>

  getAvailableBalance(userId: string): Promise<number>

  invalidateExpiredCredits(): Promise<void>

  // 👇 NECESSÁRIO PARA A POLICY
  getUserCreditStatus(userId: string): Promise<{
    availableCredits: number
    creditExpirationDate: Date | null
  }>
}

