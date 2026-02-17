import { prisma } from '../../../shared/database/prismaClient'
import {
  CreditRepository,
  CreateCreditTransactionParams,
} from '../../ports/CreditRepository'
import {
  CreditTransaction,
  CreditTransactionType,
} from '../../domain/entities/CreditTransaction'

export class PrismaCreditRepository implements CreditRepository {
  async findByUserId(userId: string): Promise<CreditTransaction[]> {
    const transactions = await prisma.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    return transactions.map(
      (tx) =>
        new CreditTransaction({
          id: tx.id,
          userId: tx.userId,
          type: tx.type as CreditTransactionType,
          amount: tx.amount,
          description: tx.description ?? undefined,
          createdAt: tx.createdAt,
          expiresAt: tx.expiresAt,
        })
    )
  }

  async create(
    params: CreateCreditTransactionParams
  ): Promise<CreditTransaction> {
    const transaction = await prisma.creditTransaction.create({
      data: {
        userId: params.userId,
        type: params.type,
        amount: params.amount,
        description: params.description,
        expiresAt: params.expiresAt ?? null,
      },
    })

    return new CreditTransaction({
      id: transaction.id,
      userId: transaction.userId,
      type: transaction.type as CreditTransactionType,
      amount: transaction.amount,
      description: transaction.description ?? undefined,
      createdAt: transaction.createdAt,
      expiresAt: transaction.expiresAt,
    })
  }

  async getAvailableBalance(userId: string): Promise<number> {
    const transactions = await prisma.creditTransaction.findMany({
      where: {
        userId,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
    })

    return transactions.reduce((balance, tx) => {
      if (tx.type === CreditTransactionType.CREDIT) {
        return balance + tx.amount
      }
      if (tx.type === CreditTransactionType.DEBIT) {
        return balance - tx.amount
      }
      return balance
    }, 0)
  }

  async getUserCreditStatus(userId: string): Promise<{
    availableCredits: number
    creditExpirationDate: Date | null
  }> {
    const transactions = await prisma.creditTransaction.findMany({
      where: { userId },
    })

    const validTransactions = transactions.filter(
      (tx) => !tx.expiresAt || tx.expiresAt > new Date()
    )

    const availableCredits = validTransactions.reduce(
      (balance, tx) => {
        if (tx.type === CreditTransactionType.CREDIT) {
          return balance + tx.amount
        }
        if (tx.type === CreditTransactionType.DEBIT) {
          return balance - tx.amount
        }
        return balance
      },
      0
    )

    const creditExpirationDate =
      validTransactions
        .filter((tx) => tx.expiresAt !== null)
        .sort(
          (a, b) =>
            a.expiresAt!.getTime() - b.expiresAt!.getTime()
        )[0]?.expiresAt ?? null

    return {
      availableCredits,
      creditExpirationDate,
    }
  }

  async invalidateExpiredCredits(): Promise<void> {
    await prisma.creditTransaction.updateMany({
      where: {
        expiresAt: { lt: new Date() },
      },
      data: {
        amount: 0,
      },
    })
  }
}
