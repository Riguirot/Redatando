export type CompetenceId = "C1" | "C2" | "C3" | "C4" | "C5"

export interface CompetenceContent {
  id: CompetenceId
  title: string
  description: string
  evaluatorFocus: string[]
  commonMistakes: string[]
  example: string
  checklist: string[]
  videoUrl: string
}
