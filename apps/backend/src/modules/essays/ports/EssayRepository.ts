import { Essay } from '../domain/entities/Essay'
import { EssayStatus } from '../domain/valueObjects/EssayStatus'

export interface EssayRepository {
  /**
   * Persiste uma nova redação
   */
  save(essay: Essay): Promise<Essay>

  /**
   * Busca uma redação específica pelo ID
   */
  findById(id: string): Promise<Essay | null>

  /**
   * Lista redações de um aluno com paginação e filtro opcional
   */
  findByStudent(params: {
    studentId: string
    page: number
    limit: number
    status?: EssayStatus
  }): Promise<{
    items: Essay[]
    total: number
  }>
}
