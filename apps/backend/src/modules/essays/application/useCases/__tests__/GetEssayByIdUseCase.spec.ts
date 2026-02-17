import { GetEssayByIdUseCase } from '../GetEssayByIdUseCase'
import { Essay } from '../../../domain/entities/Essay'
import { EssayRepository } from '../../../ports/EssayRepository'
import { BusinessError } from '../../../../shared/errors/BusinessError'
import { EssayStatus } from '../../../domain/valueObjects/EssayStatus'

describe('GetEssayByIdUseCase', () => {
  let essayRepository: jest.Mocked<EssayRepository>
  let sut: GetEssayByIdUseCase

  beforeEach(() => {
    essayRepository = {
      findById: jest.fn(),
    } as any

    sut = new GetEssayByIdUseCase(essayRepository)
  })

  it('should return essay details when essay exists and belongs to student', async () => {
    const essay = Essay.restore(
      {
        studentId: 'student-1',
        theme: 'Tema de teste',
        fileUrl: 'file-url.pdf',
      },
      'essay-id-1',
      EssayStatus.SUBMITTED,
      new Date()
    )

    const essayId = essay.getIdOrThrow()

    essayRepository.findById.mockResolvedValue(essay)

    const result = await sut.execute({
      essayId,
      studentId: 'student-1',
    })

    expect(result).toEqual({
  id: essayId,
  theme: 'Tema de teste',
  fileUrl: 'file-url.pdf',
  status: EssayStatus.SUBMITTED,
  createdAt: essay.getCreatedAt(),
})

    expect(essayRepository.findById).toHaveBeenCalledWith(essayId)
  })

  it('should throw NOT_FOUND when essay does not exist', async () => {
    essayRepository.findById.mockResolvedValue(null)

    await expect(
      sut.execute({
        essayId: 'invalid-id',
        studentId: 'student-1',
      })
    ).rejects.toBeInstanceOf(BusinessError)
  })

  it('should throw FORBIDDEN when essay belongs to another student', async () => {
    const essay = Essay.restore(
      {
        studentId: 'student-2',
        theme: 'Tema restrito',
        fileUrl: 'file-url.pdf',
      },
      'essay-id-2',
      EssayStatus.SUBMITTED,
      new Date()
    )

    const essayId = essay.getIdOrThrow()

    essayRepository.findById.mockResolvedValue(essay)

    await expect(
      sut.execute({
        essayId,
        studentId: 'student-1',
      })
    ).rejects.toBeInstanceOf(BusinessError)
  })
})
