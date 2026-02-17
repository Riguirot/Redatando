import { prisma } from '../database/prismaClient'
import { TransactionManager } from './TransactionManager'

export class PrismaTransactionManager implements TransactionManager {
  async run<T>(callback: () => Promise<T>): Promise<T> {
    return prisma.$transaction(async () => {
      return callback()
    })
  }
}
