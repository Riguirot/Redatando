import { EssayMapper } from '../EssayMapper'
import { Essay } from '../../../domain/entities/Essay'
import { EssayStatus } from '../../../domain/valueObjects/EssayStatus'

describe('EssayMapper', () => {
  it('should map Essay entity to EssayDetailsDTO', () => {
    const essay = Essay.restore(
      {
          theme: 'Tema ENEM',
          fileUrl: 'https://file.url/essay.pdf',
          studentId: ''
      },
      'essay-id-123',
      EssayStatus.SUBMITTED,
      new Date('2025-01-01')
    )

    const dto = EssayMapper.toDetailsDTO(essay)

    expect(dto).toEqual({
      id: 'essay-id-123',
      theme: 'Tema ENEM',
      status: EssayStatus.SUBMITTED,
      fileUrl: 'https://file.url/essay.pdf',
      createdAt: essay.getCreatedAt(),
    })
  })

  it('should throw if essay has no id', () => {
    const essay = Essay.create({
        theme: 'Tema inválido',
        fileUrl: 'file.pdf',
        studentId: ''
    })

    expect(() => {
      EssayMapper.toDetailsDTO(essay)
    }).toThrow()
  })
})
