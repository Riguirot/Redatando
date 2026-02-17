import { EssayStatus } from '../domain/valueObjects/EssayStatus'

export type EssayResponseDTO = {
  id?: string
  theme: string
  status: EssayStatus
  createdAt: Date
}
