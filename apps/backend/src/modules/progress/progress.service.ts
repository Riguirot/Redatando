import { CompetenceId } from "../competences/competence.types"

interface EssayScores {
  id: string
  c1: number
  c2: number
  c3: number
  c4: number
  c5: number
}

export const calculateProgressFocus = (
  essay: EssayScores
): CompetenceId => {
  const scores: Record<CompetenceId, number> = {
    C1: essay.c1,
    C2: essay.c2,
    C3: essay.c3,
    C4: essay.c4,
    C5: essay.c5
  }

  const weakest = Object.entries(scores).reduce((prev, current) =>
    current[1] < prev[1] ? current : prev
  )

  return weakest[0] as CompetenceId
}

export const getProgressFocus = async (userId: string) => {
  // 🚨 Temporário – simulação
  const lastEssay: EssayScores = {
    id: "abc123",
    c1: 160,
    c2: 180,
    c3: 140,
    c4: 170,
    c5: 150
  }

  const weakestCompetence = calculateProgressFocus(lastEssay)

  return {
    weakestCompetence,
    sourceEssayId: lastEssay.id
  }
}
