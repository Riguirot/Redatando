import { CompetenceId } from "../../competences/competence.types"
import { Progress } from "../domain/Progress"

interface EssayScores {
  id: string
  c1: number
  c2: number
  c3: number
  c4: number
  c5: number
}

export class GetProgressFocusUseCase {
  execute(userId: string): Progress {
    const lastEssay: EssayScores = {
      id: "abc123",
      c1: 160,
      c2: 180,
      c3: 140,
      c4: 170,
      c5: 150
    }

    const scores: Record<CompetenceId, number> = {
      C1: lastEssay.c1,
      C2: lastEssay.c2,
      C3: lastEssay.c3,
      C4: lastEssay.c4,
      C5: lastEssay.c5
    }

    const weakest = Object.entries(scores).reduce((prev, current) =>
      current[1] < prev[1] ? current : prev
    )

    return {
      weakestCompetence: weakest[0] as CompetenceId,
      sourceEssayId: lastEssay.id
    }
  }
}
