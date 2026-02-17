import { EssayRepository } from '../../ports/EssayRepository'
import { BusinessError } from '../../../shared/errors/BusinessError'
import { EssayMapper } from '../../infra/mappers/EssayMapper'

interface GetEssayByIdInput {
  essayId: string
  studentId: string
}

export class GetEssayByIdUseCase {
  constructor(
    private readonly essayRepository: EssayRepository
  ) {}

  async execute({ essayId, studentId }: GetEssayByIdInput) {
    const essay = await this.essayRepository.findById(essayId)

    if (!essay) {
      throw new BusinessError('Essay not found', 'NOT_FOUND')
    }

    if (essay.getStudentId() !== studentId) {
      throw new BusinessError(
        'You do not have access to this essay',
        'FORBIDDEN'
      )
    }

    return EssayMapper.toDetailsDTO(essay)
  }
}
