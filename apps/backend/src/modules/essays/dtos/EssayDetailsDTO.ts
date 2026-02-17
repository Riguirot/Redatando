import { EssayStatus } from '../domain/valueObjects/EssayStatus'

export type EssayDetailsDTO = {
  id: string
  theme: string
  status: EssayStatus
  fileUrl: string
  createdAt: Date
}
