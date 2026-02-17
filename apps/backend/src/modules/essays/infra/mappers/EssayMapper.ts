import { Essay } from '../../domain/entities/Essay'
import { EssayDetailsDTO } from '../../dtos/EssayDetailsDTO'

export class EssayMapper {
  static toDetailsDTO(essay: Essay): EssayDetailsDTO {
    return {
      id: essay.getIdOrThrow(),
      theme: essay.getTheme(),
      status: essay.getStatus(),
      fileUrl: essay.getFileUrl(),
      createdAt: essay.getCreatedAt(),
    }
  }
}
