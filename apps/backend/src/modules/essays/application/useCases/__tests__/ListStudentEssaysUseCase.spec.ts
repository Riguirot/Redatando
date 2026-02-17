import { ListStudentEssaysUseCase } from '../ListStudentEssaysUseCase'
import { Essay } from '../../../domain/entities/Essay'
import { EssayRepository } from '../../../ports/EssayRepository'
import { EssayStatus } from '../../../domain/valueObjects/EssayStatus'

describe('ListStudentEssaysUseCase', () => {
  let essayRepository: jest.Mocked<EssayRepository>
  let sut: ListStudentEssaysUseCase

  beforeEach(() => {
    essayRepository = {
      findByStudent: jest.fn(),
    } as any

    sut = new ListStudentEssaysUseCase(essayRepository)
  })

  it('should list paginated essays that belong to the student', async () => {
    const essay1 = Essay.restore(
      {
        studentId: 'student-1',
        theme: 'Tema 1',
        fileUrl: 'file-1.pdf',
      },
      'essay-1',
      EssayStatus.SUBMITTED,
      new Date('2024-01-01')
    )

    const essay2 = Essay.restore(
      {
        studentId: 'student-1',
        theme: 'Tema 2',
        fileUrl: 'file-2.pdf',
      },
      'essay-2',
      EssayStatus.SUBMITTED,
      new Date('2024-01-02')
    )

    essayRepository.findByStudent.mockResolvedValue({
      items: [essay1, essay2],
      total: 2,
    })

    const result = await sut.execute({
      studentId: 'student-1',
      page: 1,
      limit: 10,
    })

    expect(result).toEqual({
      total: 2,
      items: [
        {
          id: 'essay-1',
          theme: 'Tema 1',
          status: EssayStatus.SUBMITTED,
          createdAt: new Date('2024-01-01'),
        },
        {
          id: 'essay-2',
          theme: 'Tema 2',
          status: EssayStatus.SUBMITTED,
          createdAt: new Date('2024-01-02'),
        },
      ],
    })

    expect(essayRepository.findByStudent).toHaveBeenCalledWith({
      studentId: 'student-1',
      page: 1,
      limit: 10,
      status: undefined,
    })
  })

  it('should return empty paginated result when student has no essays', async () => {
    essayRepository.findByStudent.mockResolvedValue({
      items: [],
      total: 0,
    })

    const result = await sut.execute({
      studentId: 'student-1',
      page: 1,
      limit: 10,
    })

    expect(result).toEqual({
      items: [],
      total: 0,
    })
  })
})
