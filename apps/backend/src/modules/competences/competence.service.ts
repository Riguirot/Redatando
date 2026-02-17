import { CompetenceId } from "./competence.types"
import { competences } from "./competence.data"

export const getCompetenceById = (
  id: CompetenceId,
  hasViewedCorrection: boolean
) => {
  if (!hasViewedCorrection) {
    throw new Error("FORBIDDEN")
  }

  return competences[id]
}
