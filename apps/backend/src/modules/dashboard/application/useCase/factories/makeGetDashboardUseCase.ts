import { prisma } from "../../../../shared/database/prismaClient"

import { PrismaStudentRepository } from "../../../../users/infra/database/PrismaStudentRepository"
import { PrismaEssayRepository } from "../../../../essays/infra/database/PrismaEssayRepository"
import { PrismaCorrectionRepository } from "../../../../essays/infra/database/PrismaCorrectionRepository"
import { PrismaRecommendedThemeRepository } from "../../../../essays/infra/database/PrismaRecommendedThemeRepository"

import { GetDashboardDataUseCase } from "../GetDashboardDataUseCase"

export function makeGetDashboardUseCase() {

  const studentRepository = new PrismaStudentRepository(prisma)
  const essayRepository = new PrismaEssayRepository()
  const correctionRepository = new PrismaCorrectionRepository()
  const recommendedThemeRepository =
    new PrismaRecommendedThemeRepository()

  return new GetDashboardDataUseCase(
    studentRepository,
    essayRepository,
    correctionRepository,
    recommendedThemeRepository
  )
}