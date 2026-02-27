export interface CorrectionRepository {
  findByEssayIds(essayIds: string[]): Promise<
    {
      essayId: string
      c1: number
      c2: number
      c3: number
      c4: number
      c5: number
      total: number
    }[]
  >
}