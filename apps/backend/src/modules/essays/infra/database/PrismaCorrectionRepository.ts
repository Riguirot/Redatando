import { prisma } from "../../../shared/database/prismaClient"
import { CorrectionRepository } from "../../ports/CorrectionRepository"

export class PrismaCorrectionRepository implements CorrectionRepository {
  async findByEssayIds(essayIds: string[]) {
    if (!essayIds.length) return []

    const corrections = await prisma.correction.findMany({
      where: {
        essayId: {
          in: essayIds
        }
      }
    })

    return corrections.map(c => ({
      essayId: c.essayId,
      c1: c.c1,
      c2: c.c2,
      c3: c.c3,
      c4: c.c4,
      c5: c.c5,
      total: c.total
    }))
  }
}