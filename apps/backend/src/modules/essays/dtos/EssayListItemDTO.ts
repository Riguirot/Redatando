import { EssayStatus } from '../domain/valueObjects/EssayStatus'

export type EssayListItemDTO = {
  id: string
  theme: string
  status: EssayStatus
  createdAt: Date
}
