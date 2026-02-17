// src/modules/credits/domain/entities/CreditTransaction.ts

export enum CreditTransactionType {
  CREDIT = 'CREDIT', // adição de créditos
  DEBIT = 'DEBIT',   // consumo de créditos
}

export type CreditTransactionProps = {
  id?: string
  userId: string
  type: CreditTransactionType
  amount: number
  description?: string
  createdAt?: Date
  expiresAt?: Date | null
}

export class CreditTransaction {
  private readonly id?: string
  private readonly userId: string
  private readonly type: CreditTransactionType
  private readonly amount: number
  private readonly description?: string
  private readonly createdAt: Date
  private readonly expiresAt?: Date | null

  constructor(props: CreditTransactionProps) {
    if (props.amount <= 0) {
      throw new Error('Credit transaction amount must be greater than zero.')
    }

    this.id = props.id
    this.userId = props.userId
    this.type = props.type
    this.amount = props.amount
    this.description = props.description
    this.createdAt = props.createdAt ?? new Date()
    this.expiresAt = props.expiresAt ?? null
  }

  getId(): string | undefined {
    return this.id
  }

  getUserId(): string {
    return this.userId
  }

  getType(): CreditTransactionType {
    return this.type
  }

  getAmount(): number {
    return this.amount
  }

  getDescription(): string | undefined {
    return this.description
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getExpiresAt(): Date | null {
    return this.expiresAt ?? null
  }

  isExpired(referenceDate: Date = new Date()): boolean {
    if (!this.expiresAt) return false

    return this.expiresAt.getTime() < referenceDate.getTime()
  }

  isCredit(): boolean {
    return this.type === CreditTransactionType.CREDIT
  }

  isDebit(): boolean {
    return this.type === CreditTransactionType.DEBIT
  }
}
