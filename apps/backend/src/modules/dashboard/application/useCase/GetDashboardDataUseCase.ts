import { StudentRepository } from "../../../users/ports/StudentRepository"
import { EssayRepository } from "../../../essays/ports/EssayRepository"
import { CorrectionRepository } from "../../../essays/ports/CorrectionRepository"
import { RecommendedThemeRepository } from "../../../essays/ports/RecommendedThemeRepository"
import { EssayStatus } from "../../../essays/domain/valueObjects/EssayStatus"

interface Request {
  studentId: string
}

export class GetDashboardDataUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private essayRepository: EssayRepository,
    private correctionRepository: CorrectionRepository,
    private recommendedThemeRepository: RecommendedThemeRepository
  ) {}

  async execute({ studentId }: Request) {

    const student = await this.studentRepository.findById(studentId)

    if (!student) {
      throw new Error("Student not found")
    }

    const essays = await this.essayRepository.findByStudent({
      studentId,
      page: 1,
      limit: 100
    })

    const totalEssays = essays.total

    const correctedEssays = essays.items.filter(
      e => e.getStatus() === EssayStatus.CORRECTED
    ).length

    const activeEssays = essays.items.filter(
      e =>
        e.getStatus() === EssayStatus.SUBMITTED ||
        e.getStatus() === EssayStatus.IN_REVIEW
    ).length

    // ============================
    // 🔥 ANALYTICS
    // ============================

    const essayIds = essays.items.map(e => e.getIdOrThrow())

    const corrections =
      await this.correctionRepository.findByEssayIds(essayIds)

    // ------------------------------
    // SCORE HISTORY (AGRUPADO POR DIA)
    // ------------------------------

    const groupedCorrections: Record<
      string,
      {
        date: string
        total: number
        essays: {
          id: string
          theme: string
          total: number
        }[]
      }
    > = {}

    for (const correction of corrections) {

      const essay = essays.items.find(
        (e) => e.getIdOrThrow() === correction.essayId
      )

      if (!essay) continue

      const date = correction.createdAt.toISOString().split("T")[0]

      if (!groupedCorrections[date]) {
        groupedCorrections[date] = {
          date,
          total: correction.total,
          essays: []
        }
      }

      groupedCorrections[date].essays.push({
        id: essay.getIdOrThrow(),
        theme: essay.getTheme(),
        total: correction.total
      })
    }

    const scoreHistory = Object.values(groupedCorrections)
      .map((item) => ({
        day: new Date(item.date).getDate(),
        date: item.date,
        total: item.total,
        essays: item.essays
      }))
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )

    const correctedCount = corrections.length

    let avgC1 = 0
    let avgC2 = 0
    let avgC3 = 0
    let avgC4 = 0
    let avgC5 = 0
    let avgTotal = 0

    if (correctedCount > 0) {
      avgC1 = corrections.reduce((acc, c) => acc + c.c1, 0) / correctedCount
      avgC2 = corrections.reduce((acc, c) => acc + c.c2, 0) / correctedCount
      avgC3 = corrections.reduce((acc, c) => acc + c.c3, 0) / correctedCount
      avgC4 = corrections.reduce((acc, c) => acc + c.c4, 0) / correctedCount
      avgC5 = corrections.reduce((acc, c) => acc + c.c5, 0) / correctedCount
      avgTotal = corrections.reduce((acc, c) => acc + c.total, 0) / correctedCount
    }

    const competencies = [
      { name: "C1", value: avgC1 },
      { name: "C2", value: avgC2 },
      { name: "C3", value: avgC3 },
      { name: "C4", value: avgC4 },
      { name: "C5", value: avgC5 }
    ]

    const weakestCompetency =
      competencies
        .filter(c => c.value > 0)
        .sort((a, b) => a.value - b.value)[0]?.name ?? null

    // ============================
    // 🔥 RECOMMENDED THEMES
    // ============================

    let recommendedThemes: {
      id: string
      title: string
      focusCompetency: string
    }[] = []

    if (weakestCompetency) {
      recommendedThemes =
        await this.recommendedThemeRepository.findByCompetency(
          weakestCompetency,
          3
        )
    }

    console.log("SCORE HISTORY:", scoreHistory)

    // ============================
    // 🚀 RESPONSE
    // ============================

    return {
      student: {
        name: student.name,
        credits: student.credits
      },

      stats: {
        totalEssays,
        correctedEssays,
        activeEssays
      },

      analytics: {
        averages: {
          c1: avgC1,
          c2: avgC2,
          c3: avgC3,
          c4: avgC4,
          c5: avgC5,
          total: avgTotal
        },
        weakestCompetency,
        scoreHistory
      },

      recommendedThemes,

      recentEssays: essays.items
        .sort(
          (a, b) =>
            b.getCreatedAt().getTime() -
            a.getCreatedAt().getTime()
        )
        .slice(0, 5)
        .map(e => ({
          id: e.getIdOrThrow(),
          theme: e.getTheme(),
          status: e.getStatus(),
          createdAt: e.getCreatedAt()
        }))
    }
  }
}