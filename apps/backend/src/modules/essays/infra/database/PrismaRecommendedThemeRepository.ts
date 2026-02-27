import { prisma } from "../../../shared/database/prismaClient"
import { RecommendedThemeRepository } from "../../ports/RecommendedThemeRepository"

export class PrismaRecommendedThemeRepository
  implements RecommendedThemeRepository {

  async findByCompetency(competency: string, limit: number) {
    return prisma.recommendedTheme.findMany({
      where: {
        focusCompetency: competency
      },
      take: limit
    })
  }
}