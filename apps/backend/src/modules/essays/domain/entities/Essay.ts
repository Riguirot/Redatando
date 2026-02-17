import { EssayStatus } from '../valueObjects/EssayStatus'

type EssayProps = {
  studentId: string
  theme: string
  fileUrl: string
}

export class Essay {
  private id?: string
  private readonly studentId: string
  private readonly theme: string
  private readonly fileUrl: string
  private status: EssayStatus
  private readonly createdAt: Date

  private constructor(
    props: EssayProps,
    id?: string,
    createdAt?: Date
  ) {
    this.id = id
    this.studentId = props.studentId
    this.theme = props.theme
    this.fileUrl = props.fileUrl
    this.status = EssayStatus.SUBMITTED
    this.createdAt = createdAt ?? new Date()
  }

  /**
   * Criação de uma nova redação (antes de persistir)
   */
  static create(props: EssayProps): Essay {
    return new Essay(props)
  }

  /**
   * Reconstituição de uma redação já persistida
   */
  static restore(
    props: EssayProps,
    id: string,
    status: EssayStatus,
    createdAt: Date
  ): Essay {
    const essay = new Essay(props, id, createdAt)
    essay.status = status
    return essay
  }

  /**
   * ID pode ser indefinido antes da persistência
   */
  getId(): string | undefined {
    return this.id
  }

  /**
   * ID garantido (somente após persistência)
   */
  getIdOrThrow(): string {
    if (!this.id) {
      throw new Error('Essay ID not defined')
    }

    return this.id
  }

  getTheme(): string {
    return this.theme
  }

  getStatus(): EssayStatus {
    return this.status
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getStudentId(): string {
    return this.studentId
  }

  getFileUrl(): string {
    return this.fileUrl
  }
}
