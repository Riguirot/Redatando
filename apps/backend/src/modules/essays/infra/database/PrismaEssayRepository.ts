import { prisma } from "../../../shared/database/prismaClient"
import { Essay } from "../../domain/entities/Essay"
import { EssayRepository } from "../../ports/EssayRepository"
import { EssayStatus } from "../../domain/valueObjects/EssayStatus"

export class PrismaEssayRepository implements EssayRepository {

  async save(essay: Essay): Promise<Essay> {
    const created = await prisma.essay.create({
      data: {
        id: essay.getId(),
        studentId: essay.getStudentId(),
        theme: essay.getTheme(),
        fileUrl: essay.getFileUrl(),
        status: EssayStatus.SUBMITTED,
      },
    })

    return Essay.restore(
      {
        theme: created.theme,
        fileUrl: created.fileUrl,
        studentId: created.studentId,
      },
      created.id,
      created.status as EssayStatus,
      created.createdAt
    )
  }

  async findById(id: string): Promise<Essay | null> {
    const found = await prisma.essay.findUnique({
      where: { id },
      include: {
        correction: true // já preparado
      }
    })

    if (!found) return null

    return Essay.restore(
      {
        theme: found.theme,
        fileUrl: found.fileUrl,
        studentId: found.studentId,
      },
      found.id,
      found.status as EssayStatus,
      found.createdAt
    )
  }

  async findByStudent(params: {
    studentId: string
    page: number
    limit: number
    status?: EssayStatus
  }): Promise<{ items: Essay[]; total: number }> {

    const { studentId, page, limit, status } = params

    const where = {
      studentId,
      ...(status && { status }),
    }

    const [essays, total] = await Promise.all([
      prisma.essay.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          correction: true // 🔥 importante para o próximo passo
        }
      }),
      prisma.essay.count({ where }),
    ])

    return {
      items: essays.map((essay) =>
        Essay.restore(
          {
            theme: essay.theme,
            fileUrl: essay.fileUrl,
            studentId: essay.studentId,
          },
          essay.id,
          essay.status as EssayStatus,
          essay.createdAt
        )
      ),
      total,
    }
  }
}