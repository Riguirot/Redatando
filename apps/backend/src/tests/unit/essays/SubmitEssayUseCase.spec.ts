import { SubmitEssayUseCase } from '../../../modules/essays/application/useCases/SubmitEssayUseCase'
import { EssayRepository } from '../../../modules/essays/ports/EssayRepository'
import { StorageService } from '../../../modules/essays/ports/StorageService'
import { CreditRepository } from '../../../modules/credits/ports/CreditRepository'
import { CheckUserCreditsUseCase } from '../../../modules/credits/application/useCases/CheckUserCreditsUseCase'
import { TransactionManager } from '../../../modules/shared/transactions/TransactionManager'
import { EssayStatus } from '../../../modules/essays/domain/valueObjects/EssayStatus'
import { Essay } from '../../../modules/essays/domain/entities/Essay'

describe('SubmitEssayUseCase', () => {
  let essayRepository: jest.Mocked<EssayRepository>
  let storageService: jest.Mocked<StorageService>
  let creditRepository: jest.Mocked<CreditRepository>
  let checkUserCreditsUseCase: jest.Mocked<CheckUserCreditsUseCase>
  let transactionManager: jest.Mocked<TransactionManager>

  let sut: SubmitEssayUseCase

  beforeEach(() => {
    essayRepository = {
      save: jest.fn(),
    } as any

    storageService = {
      store: jest.fn(),
    } as any

    creditRepository = {
      create: jest.fn(),
    } as any

    checkUserCreditsUseCase = {
      execute: jest.fn(),
    } as any

    transactionManager = {
      run: jest.fn(async (callback) => callback()),
    } as any

    sut = new SubmitEssayUseCase(
      essayRepository,
      storageService,
      creditRepository,
      checkUserCreditsUseCase,
      transactionManager
    )
  })

  it('should submit an essay successfully', async () => {
    // mocks
    storageService.store.mockResolvedValue({
      url: 'file-url.pdf',
    })

    essayRepository.save.mockImplementation(async (essay) =>
      Essay.restore(
        {
          studentId: essay.getStudentId(),
          theme: essay.getTheme(),
          fileUrl: essay.getFileUrl(),
        },
        'essay-id-1',
        EssayStatus.SUBMITTED,
        new Date('2024-01-01')
      )
    )

    // act
    const result = await sut.execute({
      studentId: 'student-1',
      theme: 'Tema da redação',
      file: Buffer.from('fake-pdf'),
    })

    // assert
    expect(checkUserCreditsUseCase.execute).toHaveBeenCalledWith({
      userId: 'student-1',
      planActive: true,
    })

    expect(storageService.store).toHaveBeenCalled()

    expect(essayRepository.save).toHaveBeenCalled()

    expect(creditRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'student-1',
        amount: 1,
      })
    )

    expect(result).toEqual({
      id: 'essay-id-1',
      theme: 'Tema da redação',
      status: EssayStatus.SUBMITTED,
      createdAt: new Date('2024-01-01'),
    })
  })
})
