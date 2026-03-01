import { CompetenceId } from "../../competences/competence.types"

export interface Progress {
  weakestCompetence: CompetenceId
  sourceEssayId: string
}
