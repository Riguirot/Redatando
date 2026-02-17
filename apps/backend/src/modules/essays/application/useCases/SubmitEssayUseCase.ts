import { Essay } from '../../domain/entities/Essay'
import { EssayRepository } from '../../ports/EssayRepository'
import { StorageService } from '../../ports/StorageService'
import { SubmitEssayDTO } from '../../dtos/SubmitEssayDTO'
import { EssayResponseDTO } from '../../dtos/EssayResponseDTO'

import { CheckUserCreditsUseCase } from '../../../credits/application/useCases/CheckUserCreditsUseCase'
import { CreditRepository } from '../../../credits/ports/CreditRepository'
import {
  CreditTransactionType,
} from '../../../credits/domain/entities/CreditTransaction'

import { BusinessError } from '../../../shared/errors/BusinessError'
import { TransactionManager } from '../../../shared/transactions/TransactionManager'

export class SubmitEssayUseCase {
  constructor(
    private readonly essayRepository: EssayRepository,
    private readonly storageService: StorageService,
    private readonly creditRepository: CreditRepository,
    private readonly checkUserCreditsUseCase: CheckUserCreditsUseCase,
    private readonly transactionManager: TransactionManager
  ) {}

  async execute(input: SubmitEssayDTO): Promise<EssayResponseDTO> {
    return this.transactionManager.run(async () => {
      // 1️⃣ Valida créditos (regra de negócio)
      await this.checkUserCreditsUseCase.execute({
        userId: input.studentId,
        planActive: true,
      })

      // 2️⃣ Persiste o arquivo
      const storedFile = await this.storageService.store({
        file: input.file,
        filename: `${input.studentId}-${Date.now()}.pdf`,
      })

      // 3️⃣ Cria entidade Essay
      const essay = Essay.create({
        studentId: input.studentId,
        theme: input.theme,
        fileUrl: storedFile.url,
      })

      // 4️⃣ Salva redação
      const savedEssay = await this.essayRepository.save(essay)

      // 5️⃣ Debita 1 crédito
      await this.creditRepository.create({
        userId: input.studentId,
        type: CreditTransactionType.DEBIT,
        amount: 1,
        description: 'Envio de redação',
      })

      return {
        id: savedEssay.getId(),
        theme: savedEssay.getTheme(),
        status: savedEssay.getStatus(),
        createdAt: savedEssay.getCreatedAt(),
      }
    })
  }
}
