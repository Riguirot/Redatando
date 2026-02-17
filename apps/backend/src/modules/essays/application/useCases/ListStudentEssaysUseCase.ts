import { EssayRepository } from '../../ports/EssayRepository'
import { EssayStatus } from '../../domain/valueObjects/EssayStatus'
import { EssayListItemDTO } from '../../dtos/EssayListItemDTO'

type ListStudentEssaysInput = {
  studentId: string
  page: number
  limit: number
  status?: EssayStatus
}

type ListStudentEssaysOutput = {
  total: number
  items: EssayListItemDTO[]
}

export class ListStudentEssaysUseCase {
  constructor(
    private readonly essayRepository: EssayRepository
  ) {}

  async execute(
    input: ListStudentEssaysInput
  ): Promise<ListStudentEssaysOutput> {
    const { studentId, page, limit, status } = input

    const { items, total } =
      await this.essayRepository.findByStudent({
        studentId,
        page,
        limit,
        status,
      })

    return {
      total,
      items: items.map((essay) => ({
        id: essay.getIdOrThrow(),
        theme: essay.getTheme(),
        status: essay.getStatus(),
        createdAt: essay.getCreatedAt(),
      })),
    }
  }
}
